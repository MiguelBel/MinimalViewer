import React, { PropTypes } from 'react';

class StoryComponent extends React.Component {
  render() {
    let { StoryUrl, StoryDomain, StoryTitle } = this.props;

    return (
      <div id={'story-link'} className={'story-link'}>
        <a href={ StoryUrl } id={'story-url'} className={'story-link'}>{ StoryTitle }</a>
        <p id={'story-domain'}>{ StoryDomain }</p>
      </div>
    )
  }
}

StoryComponent.propTypes = {
  StoryUrl: PropTypes.string.isRequired,
  StoryDomain: PropTypes.string.isRequired,
  StoryTitle: PropTypes.string.isRequired
};

export default StoryComponent;
