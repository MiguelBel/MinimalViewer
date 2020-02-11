![](https://img.shields.io/badge/license-MIT-blue.svg)

## Minimal Viewer

### How we got here?

I wanted to develop a simple viewer for HackerNews because when entering the webpage I was annoyed by having to deal with a misleading interface with tons of information which I did not want to see. I was also tired of entering 10 times per day and having to search myself the latest news in the frontpage.

So I developed [this](http://www.minimalviewer.com/viewers/hackernews). After that, I realized that I was annoyed with other websites too, and so I created the same kind of viewer for those. Then I realized it could be a component.

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

You can see an example of HackerNewsViewer [here](https://github.com/MiguelBel/HackerNewsViewer).

The JavaScript component is used as below:

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
          Link: 'url',
          Root: 'headlines'
        },
        primary_color: 'black',
        secondary_color: 'orange',
        type: 'headline'
      }
    ]
  )
```

There are two arguments:

- Selector for the root `div`
- The viewers. It should be an array of hashes. One or more viewers can be set

A viewer is composed of:

- **title:** The title which will be shown at the upper left part.
- **identifier:** The identifier of the viewer. It's used to identify the internal process.
- **url:** The URL of the API. It's the URL from which the component will download the data.
- **relations:** The mapping of the downloaded JSON (the JSON must be a plain array with or without a root).
  - It should carry:
    - __Title:__ Title of the story.
    - __Subtitle:__ Subtitle of the story.
    - __Link:__ Link for the story.
    - __ElementKey:__ (optional) The element on which basis you don't want to show the item again. Can be one of the prior or a different one also included in the mapping.
    - __Root:__ (optional) If the json have a root you can configure it here.

 The relations accept complex queries as in [JMESPath](https://github.com/jmespath/jmespath.js), i.e:

```
  relations: {
    ElementKey: 'data.id',
    Title: 'data.title',
    Subtitle: 'data.domain',
    Link: 'data.url',
    Root: 'wadus.another_key'
  },
```

- **primary_color:** The primary color of the viewer.
- **secondary_color:** The secondary color of the viewer.
- **type:** The template choosen (can be headline or story).

Under the `/dist` folder you can see a simple example of how to use the component to build a minimal viewer.

### Development

The development environment uses Docker and docker-compose. You can start it up with:

```
$ docker-compose up
```

You can run the functional test suite with this command:

```
$ docker-compose exec functional_test_suite npm test
```

The ports are mapped this way:

- 9300 - If you go to `/` you can see an example of how the component is used. Check out the `index.html`file to see how it works. If you go to `/test` you can see how the component is used in the tests. It's mainly the same component but with different usage.
- 9400 - An stub for the API, it returns a fixture for the example

### Building

The app is intended to be served with statics. If you want to serve the web through statics then the only files which you need are located under the `/dist` folder:

- `index.html` | Is an example of how to use the next two files
- `minimal_viewer-VERSION.css`
- `minimal_viewer-VERSION.js`

In order to build the `dist` directory you can execute:

```
$ make create_version
```

### Contributors

1. Add your feature and do not forget the tests
2. Pull request
