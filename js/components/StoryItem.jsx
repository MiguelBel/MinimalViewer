import React from 'react';

const StoryItem = ({ color, link, subtitle, title }) => {
  const handleMouseOver = (e) => {
    const { target: { style } } = e

    style.color = color
  }

  const handleMouseOut = (e) => {
    const { target: { style } } = e

    style.color = 'inherit'
  }

  return (
    <div id='story-link' className='container Story'>
      <div
        id='url-container'
        className='Title'
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <a href={ Link } id='story-url' target='_blank'>{ Title }</a>
      </div>
      <div className='Separator'></div>
      <p className='Subtitle'>{ Subtitle }</p>
    </div>
  )
}

export default StoryItem
