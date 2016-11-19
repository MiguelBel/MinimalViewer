import React, { PropTypes } from 'react';

class StoryComponent extends React.Component {
  render() {
    let { Link, Title, Subtitle } = this.props;

    return (
      <div id={'story-link'} className={'container Story'}>
        <div className={'Title'}>
          <a href={ Link } id={'story-url'} target={'_blank'}>{ Title }</a>
        </div>
        <div className={'Separator'}></div>
        <p className={'Subtitle'}>{ Subtitle }</p>
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
