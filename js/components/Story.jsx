import React from 'react'

import HeadlineItem from './HeadlineItem'
import StoryItem from './StoryItem'
import Counter from './Counter'

const TEMPLATES = {
  'headline': HeadlineItem,
  'story': StoryItem
}
const DEFAULT_TEMPLATE = HeadlineItem

const Story = ({ color, queueIndex, queueSize, relations, story, type }) => {
  const Template = TEMPLATES[type] || DEFAULT_TEMPLATE

  return (
    <div className='full-screen visible'>
      <Template
        color={color}
        link={story[relations.Link]}
        subtitle={story[relations.Subtitle]}
        title={story[relations.Title]}
      />
      <Counter
        current={queueIndex}
        total={queueSize}
        color={color}
      />
    </div>
  )
}

export default Story
