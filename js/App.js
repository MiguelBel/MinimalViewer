import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import postal from 'postal'

import Keyboard from './Keyboard'

import Viewer from 'components/Viewer'

const INITIAL_INDEX = -1

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentIndex: INITIAL_INDEX,
    }

    this._changeViewer = this._changeViewer.bind(this)
  }

  componentWillMount () {
    this.setState({ currentIndex: 0 })

    const channel = postal.channel()
    channel.subscribe('action_triggered', this._changeViewer)
  }

  _changeViewer ({ name }) {
    const { currentIndex } = this.state
    const { viewers } = this.props
    let index

    switch (name) {
      case 'next_viewer':
        index = currentIndex + 1
        break

      case 'previous_viewer':
        index = currentIndex - 1
        break
    }

    if (viewers[index]) {
      this.setState({ currentIndex: index })
    }
  }

  render () {
    const { viewers } = this.props
    const { currentIndex } = this.state
    const viewer = viewers[currentIndex]

    Keyboard.define(viewer.identifier)

    return (
      <Viewer
        url={viewer.url}
        relations={viewer.relations}
        identifier={viewer.identifier}
        key={viewer.identifier}
        title={viewer.title}
        primary_color={viewer.primary_color}
        secondary_color={viewer.secondary_color}
        type={viewer.type}
      />
    )
  }

}

const { array } = PropTypes
App.propTypes = {
  viewers: array.isRequired
}

module.exports = {
  initialize: function (selector, configuration) {
    ReactDOM.render(
      <App viewers={configuration} />,
      document.querySelector(selector)
    )
  }
}
