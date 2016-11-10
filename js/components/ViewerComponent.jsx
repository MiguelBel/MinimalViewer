import React, { PropTypes } from 'react';

import Downloader from '../Downloader';
import Storage from '../Storage';

import StoryComponent from './StoryComponent';
import CounterComponent from './CounterComponent';
import TitleComponent from './TitleComponent';
import LoadingComponent from './LoadingComponent';
import EmptyStoriesComponent from './EmptyStoriesComponent';

const postal = require("postal");

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

    channel.subscribe('viewer_loaded', function(data) {
      if (data.element == identifier) {
        this._mark_first_as_viewed();
      }
    }.bind(this));
  }

  render() {
    let { loading, currentStory, storyQueue, currentStoryIndex, empty } = this.state;
    let { relations, identifier, title, color, defaultViewerIdentifier } = this.props

    if (empty) {
      return (
        <div id={identifier} style={{color: color}}  className={'full-screen ' + (identifier == defaultViewerIdentifier ? 'visible' : '')}>
          <TitleComponent
            Text={title}
          />

          <EmptyStoriesComponent />
        </div>
      )
    }

    if (loading || currentStory === undefined) {
      return (
        <div id={identifier} style={{color: color}}  className={'full-screen ' + (identifier == defaultViewerIdentifier ? 'visible' : '')}>
          <TitleComponent
            Text={title}
          />

          <LoadingComponent />
        </div>
      )
    }

    return (
      <div id={identifier} style={{color: color}}  className={'full-screen ' + (identifier == defaultViewerIdentifier ? 'visible' : '')}>
        <TitleComponent
          Text={title}
        />

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
    let { defaultViewerIdentifier, identifier, relations } = this.props
    const readStories = Storage.retrieve(identifier);
    const filteredStories = stories.filter(story => readStories.indexOf(story[relations.ElementKey]) == -1);

    this.setState({
      storyQueue: filteredStories,
      loading: false,
      empty: filteredStories.length == 0,
      currentStoryIndex: 0
    });

    if (filteredStories.length > 0) {
      this._show(filteredStories[0]);
      if (defaultViewerIdentifier == identifier) {
        this._mark_first_as_viewed();
      }
    }
  }

  _setByIndex(index) {
    let story = this.state.storyQueue[index];

    this.setState({ currentStoryIndex: index });

    this._show(story);
    this._mark_as_viewed(story);
  }

  _show(story) {
    this.setState({ currentStory: story });
  }

  _mark_as_viewed(story) {
    let { identifier, relations } = this.props

    if (story) {
      Storage.store(identifier, story[relations.ElementKey]);
    }
  }

  _mark_first_as_viewed() {
    let { storyQueue } = this.state
    let first_story = storyQueue[0];

    this._mark_as_viewed(first_story);
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
  relations: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default ViewerComponent;
