import React from 'react';

const Counter = ({ color, current, total, progress }) => (
  <div>
    <div className={'top-progress-bar'} style={{backgroundColor: color, width: `${progress}%`}}></div>
    <div className='counter'>
      <div className='indicator'>
        <p id='stories-counter'>
          <span className='current'style={{ color }}>{ current }</span>
          /
          { total }
        </p>
      </div>
    </div>
  </div>
)

export default Counter
