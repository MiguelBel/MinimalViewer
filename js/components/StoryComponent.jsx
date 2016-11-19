import React, { PropTypes } from 'react';

class StoryComponent extends React.Component {
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
      <div id={'story-link'} className={'container Story'}>
        <div id={'url-container'} className={'Title'}>
          <a href={ Link } id={'story-url'} target={'_blank'}>{ Title }</a>
        </div>
        <div className={'Separator'}></div>
        <p className={'Subtitle'}>{ Subtitle }</p>
      </div>
    )
  }

  coloreIt(color) {
    this.style.color = color;
  }
}

StoryComponent.propTypes = {
  Title: PropTypes.string.isRequired,
  Subtitle: PropTypes.string,
  Link: PropTypes.string.isRequired,
  SecondaryColor: PropTypes.string.isRequired
};

export default StoryComponent;
