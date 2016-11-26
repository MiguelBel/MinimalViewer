import React, { PropTypes } from 'react';

class HeadlineItemComponent extends React.Component {
  constructor () {
    super()

    this._handleMouseOver = this._handleMouseOver.bind(this)
    this._handleMouseOut = this._handleMouseOut.bind(this)
  }

  _handleMouseOver (e) {
    const { target: { style } } = e

    style.color = this.props.SecondaryColor
  }

  _handleMouseOut (e) {
    const { target: { style } } = e

    style.color = 'inherit'
  }

  render() {
    let { Link, Title, Subtitle } = this.props;

    return (
      <div id={'story-link'} className={'container Headline'}>
        <div
          id={'url-container'}
          className={'Title'}
          onMouseOver={this._handleMouseOver}
          onMouseOut={this._handleMouseOut}
        >
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
