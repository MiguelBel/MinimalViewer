const Keyboard = {
  define(identifier) {
    this.identifier = identifier;

    window.onkeydown = (e) => {
      const channel = postal.channel();
      const leftArrowCode = '37'
      const upArrowCode = '38'
      const rightArrowCode = '39'
      const downArrowCode = '40'

      if(e.keyCode == leftArrowCode){
        channel.publish(
          'action_triggered',
          {
            name: 'prev',
            element: this.identifier
          }
        );
      }

      if(e.keyCode == upArrowCode){
        channel.publish(
          'action_triggered',
          {
            name: 'previous_viewer',
            element: this.identifier
          }
        );
      }

      if(e.keyCode == rightArrowCode){
        channel.publish(
          'action_triggered',
          {
            name: 'next',
            element: this.identifier
          }
        );
      }

      if(e.keyCode == downArrowCode){
        channel.publish(
          'action_triggered',
          {
            name: 'next_viewer',
            element: this.identifier
          }
        );
      }
    }

    window.addEventListener('touchstart', this._handleTouchStart.bind(this), false);
    window.addEventListener('touchmove', this._handleTouchMove.bind(this), false);
    window.addEventListener('touchend', this._handleTouchEnd.bind(this), false);
  },

  _handleTouchStart(e) {
    this.touch = {
      start: {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      },
      current: {}
    }
  },

  _handleTouchMove(e) {
    const story = document.querySelector('#story-link')
    const xDiff = e.touches[0].clientX - this.touch.start.x

    this.touch.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }

    story.style.transform = `translateX(${xDiff}px)`
  },

  _handleTouchEnd() {
    const channel = postal.channel();

    if (!this.touch.current.x) {
      return channel.publish(
        'action_triggered',
        {
          name: 'open',
          element: this.identifier
        }
      );
    }

    const story = document.querySelector('#story-link')
    story.style.transform = ''

    if (this.touch.current.x < this.touch.start.x) {
      channel.publish(
        'action_triggered',
        {
          name: 'next',
          element: this.identifier
        }
      );
    } else {
      channel.publish(
        'action_triggered',
        {
          name: 'prev',
          element: this.identifier
        }
      );
    }
  }
}

export default Keyboard;
