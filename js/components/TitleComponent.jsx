import React, { PropTypes } from 'react';

class TitleComponent extends React.Component {
  render() {
    let { Text } = this.props

    return (
      <div id={'title'} className={'main-title'}>
        <h1>{Text}</h1>
      </div>
    )
  }
}

TitleComponent.propTypes = {
  Text: PropTypes.string.isRequired
}

export default TitleComponent
