import React, { PropTypes } from 'react';

import Downloader from '../Downloader';
import Storage from '../Storage';

import StoryComponent from './StoryComponent';
import CounterComponent from './CounterComponent';
import LoadingComponent from './LoadingComponent';
import EmptyStoriesComponent from './EmptyStoriesComponent';

class ViewerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    let { url } = this.props;

    this.setState({ loading: true, empty: false });

    Downloader.create(url, (stories) => {
      this._store(stories);
    });
  }

  componentDidMount() {
    let channel = postal.channel();
    let { identifier } = this.props;

    channel.subscribe('action_triggered', function(data) {
      if(data.element == identifier) {
        if(data.name == 'next') {
          this._next();
        }

        if(data.name == 'prev') {
          this._prev();
        }

        if(data.name == 'open') {
          this._open_current();
        }
      }
    }.bind(this));
  }

  render() {
    let { loading, currentStory, storyQueue, currentStoryIndex, empty } = this.state;
    let { relations, identifier } = this.props

    if (empty) {
      return (
        <EmptyStoriesComponent />
      )
    }

    if (loading || currentStory === undefined) {
      return (
        <LoadingComponent />
      )
    }

    return (
      <div id={identifier} className={'full-screen'}>
        <StoryComponent
          Link={currentStory[relations.Link]}
          Subtitle={currentStory[relations.Subtitle]}
          Title={currentStory[relations.Title]}
        />

        <CounterComponent
          Current={String(currentStoryIndex + 1)}
          Total={String(storyQueue.length)}
        />
      </div>
    )
  }

  _store(stories) {
    let { identifier, relations } = this.props
    const readStories = Storage.retrieve(identifier);

    const filteredStories = stories.filter(story => readStories.indexOf(story[relations.ElementKey]) == -1);

    const mappedStories = filteredStories.map(story => {
      var matches = story.url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
      var domain = matches && matches[1];
      return Object.assign({}, story, {
        domain: domain
      });
    });

    this.setState({
      storyQueue: mappedStories,
      loading: false,
      empty: mappedStories.length == 0,
      currentStoryIndex: 0
    });

    if (mappedStories.length > 0) {
      this._show(mappedStories[0]);
    }
  }

  _show(story) {
    let { identifier, relations } = this.props

    Storage.store(identifier, story[relations.ElementKey]);

    this.setState({currentStory: story});
  }

  _setByIndex(index) {
    let story = this.state.storyQueue[index];

    this.setState({
      currentStoryIndex: index,
    });

    this._show(story);
  }

  _next() {
    let existsNextStory = this.state.currentStoryIndex < (this.state.storyQueue.length - 1);

    if (existsNextStory) {
      this._setByIndex(this.state.currentStoryIndex + 1);
    }
  }

  _prev() {
    let existsPreviousStory = this.state.currentStoryIndex > 0;

    if (existsPreviousStory) {
      this._setByIndex(this.state.currentStoryIndex - 1);
    }
  }

  _open_current() {
    this._open(this.state.currentStory.url);
  }

  _open(url) {
    window.open(url);
  }
}

ViewerComponent.propTypes = {
  identifier: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  relations: PropTypes.object.isRequired
};

export default ViewerComponent;
