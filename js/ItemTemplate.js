import React from 'react';

import HeadlineItemComponent from './components/HeadlineItemComponent';
import StoryComponent from './components/StoryComponent';

const ItemTemplate = {
  forType: function(type, relations, story) {
    let template = this.templates[type];
    let data = {
      Link: story[relations.Link],
      Subtitle: story[relations.Subtitle],
      Title: story[relations.Title]
    }

    return React.createElement(template, data)
  },

  templates: {
    'headline': HeadlineItemComponent,
    'story': StoryComponent
  }
}

export default ItemTemplate;
