import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import postal from 'postal'

import Keyboard from './Keyboard'

import ViewerComponent from 'components/ViewerComponent'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {}

    this._changeViewer = this._changeViewer.bind(this)
  }

  componentWillMount () {
    const { viewers } = this.props
    const firstViewer = viewers[0]
    this.setState({ currentViewer: firstViewer })

    const channel = postal.channel()
    channel.subscribe('action_triggered', this._changeViewer)
  }

  _changeViewer ({ name }) {
    const { viewers } = this.props
    const { currentViewer } = this.state

    const currentElement = document.getElementById(currentViewer.identifier)
    const nextViewer = viewers[viewers.indexOf(currentViewer) + 1]
    const previousViewer = viewers[viewers.indexOf(currentViewer) - 1]

    switch (name) {
      case 'next_viewer':
        if (nextViewer) {
          currentElement.classList.remove('visible')
          this.setState({ currentViewer: nextViewer })
          const element = document.getElementById(nextViewer.identifier)
          element.classList.add('visible')
        }
        break

      case 'previous_viewer':
        if (previousViewer) {
          currentElement.classList.remove('visible')
          this.setState({ currentViewer: previousViewer })
          const element = document.getElementById(previousViewer.identifier)
          element.classList.add('visible')
        }
        break
    }
  }

  _notifyViewerLoaded (viewer) {
    let channel = postal.channel()

    channel.publish(
      'viewer_loaded',
      {
        element: viewer.identifier
      }
    )

  }

  render () {
    const { viewers } = this.props
    const { currentViewer } = this.state

    Keyboard.define(currentViewer.identifier)
    this._notifyViewerLoaded(currentViewer)
    const viewerList = viewers.map((viewer) =>
      <ViewerComponent
        url={viewer.url}
        relations={viewer.relations}
        identifier={viewer.identifier}
        key={viewer.identifier}
        title={viewer.title}
        primary_color={viewer.primary_color}
        secondary_color={viewer.secondary_color}
        type={viewer.type}
        defaultViewerIdentifier={currentViewer.identifier}
      />
    )

    return (
      <div className='viewers-containers'>
        {viewerList}
      </div>
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
