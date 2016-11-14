![](https://img.shields.io/badge/license-MIT-blue.svg)

## Minimal Viewer

### How we got here?

I wanted to develop a simple viewer for HackerNews because I was annoyed of entering the webpage and having to deal with a misleading interface with tons of information which I did not want to see. I also was tired of entering 10 times per day and having to search myself the new news which appeared in the frontpage.

So I developed [this](http://hacker-news-viewer.miguel.im). After I realized I was annoyed of other websites too and I created for other websites too. Then I realized it could be a component.

And that is how we got here.

### Features

You can navigate through the items with:

- Left arrow key: Go to previous item
- Right arrow key: Go to next item
- Up arrow key: Go to previous viewer
- Down arrow key: Go to next viewer
- Enter: Open the current item
- Space bar: Open the current item

### Usage

You can see an example of HackerNewsViewer [here](https://github.com/MiguelBel/HackerNewsViewer)

Is a JavaScript component used as:

```
  MinimalViewer.initialize(
    '#root',
    [
      {
        title: 'HackerNews',
        identifier: 'hackernews',
        url: 'http://localhost:9400',
        relations: {
          ElementKey: 'id',
          Title: 'title',
          Subtitle: 'domain',
          Link: 'url'
        },
        color: 'black'
      }
    ]
  )
```

There is two arguments:

- Selector for the root div
- The viewers. It should be an array of hashes. One or more viewers can be set

A viewer is composed of:

- **title:** The title which will be shown at the upper left part.
- **identifier:** The identifier of the viewer. It is used for identify the internal process.
- **url:** The url of the api. It is the url from the component will download the data.
- **relations:** The mapping of the JSON downloaded (the JSON must be a plain array).
  - It should carry:
    - __Title:__ Title of the story.
    - __Subtitle:__ Subtitle of the story.
    - __Link:__ Link of the story.
    - __ElementKey:__ The element in which basis you do     not want to show again. Can be one of the prior mentioned or other different.
- **color:** The color of the viewer.

Under the /dist folder you can see a simple example of how to use the component to build a minimal viewer.

### Development

For the development environment is used Docker and docker-compose. You can start it with:

```
$ docker-compose up
```

You can run the functional test suite with this command:

```
$ docker-compose exec functional_test_suite npm test
```

The ports are mapped this way:

- 9300 - If you go to the roo / you can see an example of how the component is used. Check out the file index.html to see how it works. If you go to /test you can see how the component is used in the tests. Is mainly the same component with different usage.
- 9400 - An stub for the API, it returns a fixture for the example

### Building

The app is intended to be served with statics. If you want to serve the web through statics then the only files which you need are located under the /dist folder:

- index.html
- css/
- img/
- minimal_viewer.js

For building the dist directory you can execute:

```
$ docker-compose exec minimal_viewer npm run build
```

### Contributors

1. Add your feature and do not forget the tests
2. Build the project to have it updated in dist/
3. Pull request
