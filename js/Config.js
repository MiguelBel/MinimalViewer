const Config = {
  viewers: [
    {
      title: 'HackerNews',
      identifier: 'hackernews',
      url: 'https://polar-ridge-70990.herokuapp.com',
      relations: {
        ElementKey: 'id',
        Title: 'title',
        Subtitle: 'domain',
        Link: 'url'
      },
      color: 'black'
    }
  ]
}

export default Config;
