import React, { Component, PropTypes } from 'react'
import postal from 'postal'

import Downloader from '../Downloader'
import Storage from '../Storage'

import Layout from './Layout'
import Story from './Story'
import Loading from './Loading'
import EmptyStories from './EmptyStories'

const INITIAL_INDEX = -1

class Viewer extends Component {
  constructor () {
    super()

    this.state = {
      currentIndex: INITIAL_INDEX,
      isEmpty: false,
      isLoading: true
    }

    this._actionStory = this._actionStory.bind(this)
    this._store = this._store.bind(this)
  }

  componentWillMount () {
    const { url } = this.props

    Downloader.create(url, this._store)
  }

  componentDidMount () {
    const channel = postal.channel()
    channel.subscribe('action_triggered', this._actionStory)
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

  render () {
    const {
      currentIndex,
      isLoading,
      isEmpty,

      storyQueue,
    } = this.state
    const {
      relations,
      identifier,
      title,
      primary_color,
      secondary_color,
      type,
    } = this.props

    const currentStory = storyQueue && storyQueue[currentIndex]
    this._markAsViewed(currentStory)

    if (isEmpty) {
      return (
        <Layout id={identifier} color={primary_color} title={title}>
          <EmptyStories />
        </Layout>
      )
    }

    if (isLoading) {
      return (
        <Layout id={identifier} color={primary_color} title={title}>
          <Loading SecondaryColor={secondary_color}/>
        </Layout>
      )
    }

    return (
      <Layout id={identifier} color={primary_color} title={title}>
        <Story
          queueIndex={String(currentIndex + 1)}
          queueSize={String(storyQueue.length)}
          relations={relations}
          secondaryColor={secondary_color}
          story={currentStory}
          type={type}
        />
      </Layout>
    )
  }

  _store (stories) {
    const { identifier, relations } = this.props
    const readStories = Storage.retrieve(identifier)
    const filteredStories = stories.filter(story =>
      readStories.indexOf(story[relations.ElementKey]) === -1
    )

    this.setState({
      currentIndex: 0,
      isEmpty: filteredStories.length == 0,
      isLoading: false,
      storyQueue: filteredStories
    })
  }

  _setByIndex (index) {
    const story = this.state.storyQueue[index]

    this.setState({
      currentIndex: index,
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
    const validIndex = currentIndex < (storyQueue.length - 1)

    if (validIndex) {
      this._setByIndex(currentIndex + 1)
    }
  }

  _prev () {
    const { currentIndex } = this.state
    const validIndex = currentIndex > 0

    if (validIndex) {
      this._setByIndex(currentIndex - 1)
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
}

const { string, object } = PropTypes
Viewer.propTypes = {
  identifier: string.isRequired,
  url: string.isRequired,
  relations: object.isRequired,
  title: string.isRequired,
  primary_color: string.isRequired,
  secondary_color: string.isRequired,
  type: string.isRequired
}

export default Viewer
