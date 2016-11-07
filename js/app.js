import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ViewerComponent from 'components/ViewerComponent';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { url, relations } = this.props;

    return (
      <ViewerComponent
        url={url}
        relations={relations}
      />
    )
  }
}

Index.propTypes = {
  url: PropTypes.string.isRequired,
  relations: PropTypes.object.isRequired
};

Index.defaultProps = {
  url: 'https://polar-ridge-70990.herokuapp.com',
  relations: {
    Title: 'title',
    Subtitle: 'domain',
    Link: 'url'
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
