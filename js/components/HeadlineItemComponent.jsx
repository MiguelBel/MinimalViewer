import React, { PropTypes } from 'react';

class HeadlineItemComponent extends React.Component {
  render() {
    let { Link, Title, Subtitle } = this.props;

    return (
      <div id={'story-link'} className={'container Headline'}>
        <div className={'Title'}>
          <a href={ Link } id={'story-url'} target={'_blank'}>{ Title }</a>
        </div>
        <p className={'Subtitle'}>{ Subtitle }</p>
      </div>
    )
  }
}

HeadlineItemComponent.propTypes = {
  Title: PropTypes.string.isRequired,
  Subtitle: PropTypes.string,
  Link: PropTypes.string.isRequired
};

export default HeadlineItemComponent;
