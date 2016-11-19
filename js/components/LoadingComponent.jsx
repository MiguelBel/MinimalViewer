import React, { PropTypes } from 'react';

class LoadingComponent extends React.Component {
  render() {
    let { SecondaryColor } = this.props;

    return (
      <div className={'loader-container'}>
          <div className={'loader'} style={{color: SecondaryColor, background: SecondaryColor}}>Loading...</div>
      </div>
    )
  }
}

LoadingComponent.propTypes = {
  SecondaryColor: PropTypes.string.isRequired
};

export default LoadingComponent;
