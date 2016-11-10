import React from 'react';

class EmptyStoriesComponent extends React.Component {
  render() {
    return (
      <div className={'empty-container'}>
        <div className={'empty-message'}>
          <p>Woops! There is nothing else for you, yet...</p>
        </div>
      </div>
    )
  }
}

export default EmptyStoriesComponent;
