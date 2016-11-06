import React, { PropTypes } from 'react';

class CounterComponent extends React.Component {
  render() {
    let { Current, Total } = this.props;

    return (
      <div className={'counter'}>
        <p id={'stories-counter'}>{ Current }/{ Total }</p>
      </div>
    )
  }
}

CounterComponent.propTypes = {
  Current: PropTypes.string.isRequired,
  Total: PropTypes.string.isRequired
};

export default CounterComponent;
