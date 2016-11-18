import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Keyboard from './Keyboard';

import ViewerComponent from 'components/ViewerComponent';
const postal = require("postal");

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
          let current_element = document.getElementById(currentViewer.identifier);
          current_element.classList.remove("visible");
          this.setState({ currentViewer: next_viewer });
          let element = document.getElementById(next_viewer.identifier);
          element.classList.add("visible");
        }
      }

      if(data.name == 'previous_viewer') {
        let { currentViewer } = this.state;
        let previous_viewer = viewers[viewers.indexOf(currentViewer) - 1];
        if(previous_viewer != undefined) {
          let current_element = document.getElementById(currentViewer.identifier);
          current_element.classList.remove("visible");
          this.setState({ currentViewer: previous_viewer });
          let element = document.getElementById(previous_viewer.identifier);
          element.classList.add("visible");
        }
      }
    }.bind(this));
  }

  render() {
    let { viewers } = this.props;
    let { currentViewer } = this.state;

    Keyboard.define(currentViewer.identifier);
    this._notify_viewer_loaded(currentViewer);

    return (
      <div className={'viewers-containers'}>
        {viewers.map((viewer) =>
          <ViewerComponent
            url={viewer.url}
            relations={viewer.relations}
            identifier={viewer.identifier}
            key={viewer.identifier}
            title={viewer.title}
            color={viewer.color}
            type={viewer.type}
            defaultViewerIdentifier={currentViewer.identifier}
          />
        )}
      </div>
    )
  }

  _notify_viewer_loaded(viewer) {
    let channel = postal.channel();

    channel.publish(
      'viewer_loaded',
      {
        element: viewer.identifier
      }
    );

  }
}

Index.propTypes = {
  viewers: PropTypes.array.isRequired
};

module.exports = {
  initialize: function (selector, configuration) {
    ReactDOM.render(
      <Index viewers={configuration} />,
      document.querySelector(selector)
    );
  }
};
