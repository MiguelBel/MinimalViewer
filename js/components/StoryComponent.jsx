import React, { PropTypes } from 'react';

class StoryComponent extends React.Component {
  render() {
    let { Link, Title, Subtitle } = this.props;

    return (
      <div id={'story-link'} className={'story-link'}>
        <a href={ Link } id={'story-url'} className={'story-link'} target={'_blank'}>{ Title }</a>
        <p id={'story-domain'}>{ Subtitle }</p>
      </div>
    )
  }
}

StoryComponent.propTypes = {
  Title: PropTypes.string.isRequired,
  Subtitle: PropTypes.string,
  Link: PropTypes.string.isRequired
};

export default StoryComponent;
