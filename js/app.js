import React from 'react';
import ReactDOM from 'react-dom';

const Viewer = {
  create (selector, { url }) {
    Downloader.create(url, this.store.bind(this))
    this.SELECTOR = selector
  },

  store (stories) {
    this.STORIES = this.discardRead(stories)
    this.setup()
    this.update()
  },

  discardRead (stories) {
    readStories = JSON.parse(localStorage.getItem('viewer')) || []
    return stories.filter(story =>
      readStories.indexOf(story.id) == -1
    )
  },

  show (story) {
    let link = document.querySelector(`${this.SELECTOR} #story-url`)
    link.href = story.url
    link.innerText = story.title

    let domain = document.querySelector(`${this.SELECTOR} #story-domain`)
    domain.innerText = this.domain(story.url)

    let counter = document.querySelector(`${this.SELECTOR} #stories-counter`)
    counter.innerText = `${this.INDEX + 1} / ${this.STORIES.length}`

    let viewedItems = JSON.parse(localStorage.getItem('viewer')) || []
    viewedItems.push(story.id)
    localStorage.setItem('viewer', JSON.stringify(viewedItems));
  },

  update () {

    const story = this.STORIES[this.INDEX]
    this.show(story)
  },

  next () {
    if (this.INDEX < (this.STORIES.length - 1)) {
      this.INDEX += 1
    }
    this.update()
  },

  prev () {
    if (this.INDEX > 0) {
      this.INDEX -= 1
    }
    this.update()
  },

  open (url) {
    window.open(url)
  },

  setup () {
    document.getElementById('loading-image').setAttribute('hidden', true)
    this.INDEX = 0
    this.addHandlers()
  },

  addHandlers () {
    window.onkeydown = (e) => {
      leftArrowCode = '37'
      upArrowCode = '38'
      rightArrowCode = '39'

      if(e.keyCode == leftArrowCode){
        this.prev()
      }

      if(e.keyCode == upArrowCode){
        this.open(this.STORIES[this.INDEX].url)
      }

      if(e.keyCode == rightArrowCode){
        this.next()
      }
    }
  },

  domain (url) {
    var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var domain = matches && matches[1];

    return domain;
  }
}

const Downloader = {
  create (url, fn) {
    this.API_URL = url
    this.download_stories(fn)
  },

  download_stories (fn) {
    fetch(this.API_URL).then(response => {
      response.json().then(parsed =>
        fn(parsed)
      )
    })
  }
}

class Index extends React.Component {
  render() {
    return (
      <p>Hello world</p>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
