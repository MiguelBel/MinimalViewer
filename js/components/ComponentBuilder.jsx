import React from 'react'
import EmptyStories from './EmptyStories'
import Loading from './Loading'
import Story from './Story'

const ComponentBuilder = ({ color, isEmpty, isLoading, ...story }) => {

  if (isEmpty) return (
    <EmptyStories />
  )

  if (isLoading) return (
    <Loading color={color} />
  )

  return (
    <Story
      {...story}
      color={color}
    />
  )
}

export default ComponentBuilder
