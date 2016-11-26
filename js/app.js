import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import postal from 'postal'

import Keyboard from './Keyboard'

import ViewerComponent from 'components/ViewerComponent'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentViewer: null
    }

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
    const { currentViewer } = this.state
    const { viewers } = this.props
    let viewer

    switch (name) {
      case 'next_viewer':
        viewer = viewers[viewers.indexOf(currentViewer) + 1]
        break

      case 'previous_viewer':
        viewer = viewers[viewers.indexOf(currentViewer) - 1]
        break
    }

    if (viewer) {
      this.setState({ currentViewer: viewer })
    }
  }

  render () {
    const { viewers } = this.props
    const { currentViewer } = this.state

    Keyboard.define(currentViewer.identifier)
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
