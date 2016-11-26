import React, { Component, PropTypes } from 'react'

import ItemTemplate from '../ItemTemplate'
import CounterComponent from './CounterComponent'

class Story extends Component {
  render () {
    const { queueIndex, queueSize, relations, secondaryColor, story, type } = this.props

    return (
      <div className='full-screen visible'>
        { ItemTemplate.forType(type, relations, story, secondaryColor) }

        <CounterComponent
          Current={queueIndex}
          Total={queueSize}
          SecondaryColor={secondaryColor}
        />
      </div>
    )
  }
}

const { string, object } = PropTypes
Story.propTypes = {
  queueIndex: string.isRequired,
  queueSize: string.isRequired,
  relations: object.isRequired,
  secondaryColor: string.isRequired,
  story: object.isRequired,
  type: string.isRequired
}

export default Story
