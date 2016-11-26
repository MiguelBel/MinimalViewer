import React from 'react';

const Loading = ({ color }) => (
  <div className='loader-container'>
    <div className='loader' style={{color, background: color}}>
      Loading...
    </div>
  </div>
)

export default Loading
