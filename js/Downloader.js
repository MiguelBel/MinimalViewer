import jmespath from 'jmespath'

const Downloader = {
  create (url, fn, root) {
    this.API_URL = url
    this.download_stories(fn, root)
  },

  download_stories (fn, root) {
    fetch(this.API_URL).then(response => {
      response.json().then(parsed => {
        if (root) {
          fn(jmespath.search(parsed, root))
        } else {
          fn(parsed)
        }
      })
    })
  }
}

export default Downloader
