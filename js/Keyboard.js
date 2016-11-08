const Keyboard = {
  define(component) {
    this.component = component;

    window.onkeydown = (e) => {
      const leftArrowCode = '37'
      const upArrowCode = '38'
      const rightArrowCode = '39'

      if(e.keyCode == leftArrowCode){
        component.prev()
      }

      if(e.keyCode == upArrowCode){
        component.open_current()
      }

      if(e.keyCode == rightArrowCode){
        component.next()
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
    if (!this.touch.current.x) {
      return this.component.open_current();
    }

    const story = document.querySelector('#story-link')
    story.style.transform = ''

    if (this.touch.current.x < this.touch.start.x) {
      this.component.next()
    } else {
      this.component.prev()
    }
  }
}

export default Keyboard;
