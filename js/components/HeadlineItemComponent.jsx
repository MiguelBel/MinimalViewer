import React, { PropTypes } from 'react';

class HeadlineItemComponent extends React.Component {
  componentDidMount() {
    let { SecondaryColor } = this.props;

    document.querySelector('#url-container').onmouseover = function() {
      this.style.color = SecondaryColor;
    }

    document.querySelector('#url-container').onmouseout = function() {
      this.style.color = 'inherit';
    }
  }

  render() {
    let { Link, Title, Subtitle } = this.props;

    return (
      <div id={'story-link'} className={'container Headline'}>
        <div id={'url-container'} className={'Title'}>
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
  Link: PropTypes.string.isRequired,
  SecondaryColor: PropTypes.string.isRequired
};

export default HeadlineItemComponent;
