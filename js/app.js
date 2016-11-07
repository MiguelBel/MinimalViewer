import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ViewerComponent from 'components/ViewerComponent';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { viewers } = this.props;

    return (
      <div className={'viewers-containers'}>
        {viewers.map((viewer) =>
          <ViewerComponent
            url={viewer.url}
            relations={viewer.relations}
            identifier={viewer.identifier}
            key={viewer.identifier}
          />
        )}
      </div>
    )
  }
}

Index.propTypes = {
  viewers: PropTypes.array.isRequired
};

Index.defaultProps = {
  viewers: [
    {
      identifier: 'hackernews_one',
      url: 'https://polar-ridge-70990.herokuapp.com',
      relations: {
        ElementKey: 'id',
        Title: 'title',
        Subtitle: 'domain',
        Link: 'url'
      }
    }
  ]
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
