import React, { PropTypes } from 'react';

import Downloader from '../Downloader';

import StoryComponent from './StoryComponent';
import LoadingComponent from './LoadingComponent';

class ViewerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    // Fetch data
    let { url } = this.props;
    this.setState({loading: true});
    // Show loader at first obviously
    Downloader.create(url, (stories) => {
      // and then show stories?
      console.log(stories);
      this._store(stories);
    });
  }

  render() {

    let { loading, currentStory } = this.state;

    if (loading || currentStory === undefined) {
      return (
        <LoadingComponent />
      )
    }
    return (
      <StoryComponent StoryUrl={currentStory.url} StoryDomain={currentStory.domain} StoryTitle={currentStory.title} />
    )
  }

  _store(stories) {
    // Filter out already read stories
    const readStories = JSON.parse(localStorage.getItem('viewer')) || [];

    const filteredStories = stories.filter(story => readStories.indexOf(story.id) == -1);

    // Map so we have the proper URLs
    const mappedStories = filteredStories.map(story => {
      var matches = story.url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
      var domain = matches && matches[1];
      return Object.assign({}, story, {
        domain: domain
      });
    });

    // Then add the new ones to the queue
    this.setState({
      storyQueue: mappedStories,
      loading: false
    });

    this._show(mappedStories[0]);
  }

  _show(story) {
    /*let viewedItems = JSON.parse(localStorage.getItem('viewer')) || [];
    viewedItems.push(story.id);
    localStorage.setItem('viewer', JSON.stringify(viewedItems));*/

    this.setState({currentStory: story});
  }

}

ViewerComponent.propTypes = {
    url: PropTypes.string.isRequired
};

ViewerComponent.defaultProps = {
  url: 'https://polar-ridge-70990.herokuapp.com'
};

export default ViewerComponent;
