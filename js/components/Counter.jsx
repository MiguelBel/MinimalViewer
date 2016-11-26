import React from 'react';

const Counter = ({ color, current, total }) => (
  <div className='counter'>
    <div className='indicator'>
      <p id='stories-counter'>
        <span className='current'style={{ color }}>{ current }</span>
        /
        { total }
      </p>
    </div>
  </div>
)

export default Counter
