import React from 'react';

class LoadingComponent extends React.Component {
  render() {
    return (
      <div className={'full-screen'}>
        <img src="img/loading.gif" className={'central-image'} />
      </div>
    )
  }
}

export default LoadingComponent;
