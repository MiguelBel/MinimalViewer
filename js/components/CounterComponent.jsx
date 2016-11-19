import React, { PropTypes } from 'react';

class CounterComponent extends React.Component {
  render() {
    let { Current, Total } = this.props;

    return (
      <div className={'counter'}>
        <div className={'indicator'}>
          <p id={'stories-counter'}><span className={'current'}>{ Current }</span>/{ Total }</p>
        </div>
      </div>
    )
  }
}

CounterComponent.propTypes = {
  Current: PropTypes.string.isRequired,
  Total: PropTypes.string.isRequired
};

export default CounterComponent;
