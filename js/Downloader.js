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

export default Downloader;
