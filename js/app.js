import React from 'react';
import ReactDOM from 'react-dom';

import ViewerComponent from 'components/ViewerComponent';

class Index extends React.Component {
  render() {
    return (
      <ViewerComponent />
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
