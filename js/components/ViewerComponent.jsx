import React, { PropTypes } from 'react';

import Downloader from '../Downloader';

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

    window.onkeydown = (e) => {
      const leftArrowCode = '37'
      const upArrowCode = '38'
      const rightArrowCode = '39'

      if(e.keyCode == leftArrowCode){
        this._prev()
      }

      if(e.keyCode == upArrowCode){
        this._open(this.state.currentStory.url);
      }

      if(e.keyCode == rightArrowCode){
        this._next()
      }
    }

    window.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
    window.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
    window.addEventListener('touchend', this.handleTouchEnd.bind(this), false);
  }

  handleTouchStart(e) {
    this.touch = {
      start: {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      },
      current: {}
    }
  }

  handleTouchMove(e) {
    const story = document.querySelector('#story-link')
    const xDiff = e.touches[0].clientX - this.touch.start.x

    this.touch.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }

    story.style.transform = `translateX(${xDiff}px)`
  }

  handleTouchEnd() {
    if (!this.touch.current.x) {
      return this._open(this.state.currentStory.url);
    }

    const story = document.querySelector('#story-link')
    story.style.transform = ''

    if (this.touch.current.x < this.touch.start.x) {
      this._next()
    } else {
      this._prev()
    }
  }

  render() {
    let { loading, currentStory, storyQueue, currentStoryIndex, empty } = this.state;
    let { relations } = this.props

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
      <div id={'story-container'} className={'full-screen'}>
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
    let { identifier } = this.props
    const readStories = JSON.parse(localStorage.getItem(`viewer_${identifier}`)) || [];

    const filteredStories = stories.filter(story => readStories.indexOf(story.id) == -1);

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
    let { identifier } = this.props
    let viewedItems = JSON.parse(localStorage.getItem(`viewer_${identifier}`)) || [];
    let story_id = story.id
    let pending_to_register = viewedItems.indexOf(story_id) == -1
    if(pending_to_register) {
      viewedItems.push(story_id);
      localStorage.setItem(`viewer_${identifier}`, JSON.stringify(viewedItems));
    }
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
    if (this.state.currentStoryIndex < (this.state.storyQueue.length - 1)) {
      this._setByIndex(this.state.currentStoryIndex + 1);
    }
  }

  _prev() {
    if (this.state.currentStoryIndex > 0) {
      this._setByIndex(this.state.currentStoryIndex - 1);
    }
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
