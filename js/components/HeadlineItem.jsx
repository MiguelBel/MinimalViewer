import React from 'react';

const HeadLineItem = ({ color, link, subtitle, title }) => {
  const handleMouseOver = (e) => {
    const { target: { style } } = e

    style.color = color
  }

  const handleMouseOut = (e) => {
    const { target: { style } } = e

    style.color = 'inherit'
  }

  return (
    <div id='story-link' className='container Headline'>
      <div
        id='url-container'
        className='Title'
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <a href={link} id='story-url' target='_blank'>{title}</a>
      </div>
      <p className='Subtitle'>{subtitle}</p>
    </div>
  )
}

export default HeadLineItem
