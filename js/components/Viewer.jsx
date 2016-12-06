import React, { Component, PropTypes } from 'react'
import postal from 'postal'

import Downloader from '../Downloader'
import Storage from '../Storage'

import Layout from './Layout'
import ComponentBuilder from './ComponentBuilder'

const INITIAL_INDEX = -1

class Viewer extends Component {
  constructor () {
    super()

    this.state = {
      currentIndex: INITIAL_INDEX,
      isEmpty: false,
      isLoading: true,
      storyQueue: []
    }

    this._actionStory = this._actionStory.bind(this)
    this._store = this._store.bind(this)
  }

  componentWillMount () {
    const { url, relations } = this.props

    Downloader.create(url, this._store, relations.Root)
  }

  componentDidMount () {
    const channel = postal.channel()
    this.subscription = channel.subscribe('action_triggered', this._actionStory)
  }

  componentWillUnmount () {
    this.subscription.unsubscribe()
  }

  _actionStory ({ element, name }) {
    const { identifier } = this.props
    if (element !== identifier) return

    switch (name) {
      case 'next':
        this._next()
        break

      case 'prev':
        this._prev()
        break

      case 'open':
        this._openCurrent()
        break
    }
  }

  _store (stories) {
    const { identifier, relations } = this.props
    const readStories = Storage.retrieve(identifier)
    const filteredStories = stories.filter(story =>
      readStories.indexOf(story[relations.ElementKey]) === -1
    )

    this.setState({
      currentIndex: 0,
      isEmpty: filteredStories.length === 0,
      isLoading: false,
      storyQueue: filteredStories
    })
  }

  _markAsViewed (story) {
    const { identifier, relations } = this.props

    if (story) {
      Storage.store(identifier, story[relations.ElementKey])
    }
  }

  _next () {
    const { currentIndex, storyQueue } = this.state
    const index = currentIndex + 1
    const validIndex = index <= (storyQueue.length - 1)

    if (validIndex) {
      this.setState({ currentIndex: index })
    }
  }

  _prev () {
    const { currentIndex } = this.state
    const index = currentIndex - 1
    const validIndex = index >= 0

    if (validIndex) {
      this.setState({ currentIndex: index })
    }
  }

  _openCurrent () {
    const { currentIndex, storyQueue } = this.state
    const currentStory = storyQueue[currentIndex]
    this._open(currentStory.url)
  }

  _open (url) {
    window.open(url)
  }

  render () {
    const { currentIndex, isEmpty, isLoading, storyQueue } = this.state
    const { identifier, primaryColor, relations, secondaryColor, title, type, } = this.props

    const currentStory = storyQueue && storyQueue[currentIndex]
    this._markAsViewed(currentStory)

    return (
      <Layout id={identifier} color={primaryColor} title={title}>
        <ComponentBuilder
          isEmpty={isEmpty}
          isLoading={isLoading}
          queueIndex={String(currentIndex + 1)}
          queueSize={String(storyQueue.length)}
          relations={relations}
          color={secondaryColor}
          story={currentStory}
          type={type}
        />
      </Layout>
    )
  }
}

const { string, object } = PropTypes
Viewer.propTypes = {
  identifier: string.isRequired,
  primaryColor: string.isRequired,
  relations: object.isRequired,
  secondaryColor: string.isRequired,
  title: string.isRequired,
  type: string.isRequired,
  url: string.isRequired
}

export default Viewer
