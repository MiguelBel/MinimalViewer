import React from 'react'
import jmespath from 'jmespath'

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
  let progress = (queueIndex / queueSize) * 100

  return (
    <div className='full-screen visible'>
      <Template
        color={color}
        link={jmespath.search(story, relations.Link)}
        subtitle={jmespath.search(story, relations.Subtitle)}
        title={jmespath.search(story, relations.Title)}
      />
      <Counter
        current={queueIndex}
        total={queueSize}
        color={color}
        progress={progress}
      />
    </div>
  )
}

export default Story
