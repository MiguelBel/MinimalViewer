import React from 'react';

import HeadlineItem from './components/HeadlineItem';
import StoryItem from './components/StoryItem';

const ItemTemplate = {
  forType: function(type, relations, story, color) {
    const template = this.templates[type];
    const data = {
      link: story[relations.Link],
      subtitle: story[relations.Subtitle],
      title: story[relations.Title],
      color
    }

    return React.createElement(template, data)
  },

  templates: {
    'headline': HeadlineItem,
    'story': StoryItem
  }
}

export default ItemTemplate;
