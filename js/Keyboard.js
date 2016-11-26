import postal from 'postal'

const [LEFT, UP, RIGHT, DOWN, ENTER, SPACE] = [37, 38, 39, 40, 13, 32]
const VALID_KEY_CODES = [LEFT, UP, RIGHT, DOWN, ENTER, SPACE]
const Keyboard = {
  define (identifier) {
    this.identifier = identifier

    document.onkeydown = (e) => {
      const { keyCode } = e
      if (!VALID_KEY_CODES.includes(keyCode)) return
      e.preventDefault()

      switch (keyCode) {
        case UP:
          return this._triggerAction('previous_viewer')
        case DOWN:
          return this._triggerAction('next_viewer')
        case LEFT:
          return this._triggerAction('prev')
        case RIGHT:
          return this._triggerAction('next')
        case ENTER:
        case SPACE:
          return this._triggerAction('open')
      }
    }

    window.addEventListener('touchstart', this._handleTouchStart.bind(this), false)
    window.addEventListener('touchmove', this._handleTouchMove.bind(this), false)
    window.addEventListener('touchend', this._handleTouchEnd.bind(this), false)
  },

  _triggerAction (name) {
    const channel = postal.channel()

    channel.publish(
      'action_triggered',
      {
        name,
        element: this.identifier
      }
    )
  },

  _handleTouchStart (e) {
    this.touch = {
      start: {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      },
      current: {}
    }
  },

  _handleTouchMove (e) {
    const story = document.querySelector('#story-link')
    const xDiff = e.touches[0].clientX - this.touch.start.x

    this.touch.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }

    story.style.transform = `translateX(${xDiff}px)`
  },

  _handleTouchEnd () {
    if (!this.touch.current.x) {
      return this._triggerAction('open')
    }

    const story = document.querySelector('#story-link')
    story.style.transform = ''

    if (this.touch.current.x < this.touch.start.x) {
      return this._triggerAction('next')
    } else {
      return this._triggerAction('prev')
    }
  }
}

export default Keyboard
