import React from 'react';

import HeadlineItemComponent from './components/HeadlineItemComponent';
import StoryComponent from './components/StoryComponent';

const ItemTemplate = {
  forType: function(type, relations, story, secondary_color) {
    const template = this.templates[type];
    const data = {
      Link: story[relations.Link],
      Subtitle: story[relations.Subtitle],
      Title: story[relations.Title],
      SecondaryColor: secondary_color
    }

    return React.createElement(template, data)
  },

  templates: {
    'headline': HeadlineItemComponent,
    'story': StoryComponent
  }
}

export default ItemTemplate;
