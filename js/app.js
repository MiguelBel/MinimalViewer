import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Keyboard from './Keyboard';

import ViewerComponent from 'components/ViewerComponent';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    let { viewers } = this.props;
    let first_viewer = viewers[0];
    this.setState({ currentViewer: first_viewer });

    let channel = postal.channel()
    channel.subscribe('action_triggered', function(data){
      if(data.name == 'next_viewer') {
        let { currentViewer } = this.state;
        let next_viewer = viewers[viewers.indexOf(currentViewer) + 1];
        if(next_viewer != undefined) {
          this.setState({ currentViewer: next_viewer });
        }
      }

      if(data.name == 'previous_viewer') {
        let { currentViewer } = this.state;
        let previous_viewer = viewers[viewers.indexOf(currentViewer) - 1];
        if(previous_viewer != undefined) {
          this.setState({ currentViewer: previous_viewer });
        }
      }
    }.bind(this));
  }

  render() {
    let { viewers } = this.props;
    let { currentViewer } = this.state;

    Keyboard.define(currentViewer.identifier);

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
