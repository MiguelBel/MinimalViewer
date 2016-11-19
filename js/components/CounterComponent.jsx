import React, { PropTypes } from 'react';

class CounterComponent extends React.Component {
  render() {
    let { Current, Total, SecondaryColor } = this.props;

    return (
      <div className={'counter'}>
        <div className={'indicator'}>
          <p id={'stories-counter'}><span className={'current'}style={{color: SecondaryColor}}>{ Current }</span>/{ Total }</p>
        </div>
      </div>
    )
  }
}

CounterComponent.propTypes = {
  Current: PropTypes.string.isRequired,
  Total: PropTypes.string.isRequired,
  SecondaryColor: PropTypes.string.isRequired
};

export default CounterComponent;
