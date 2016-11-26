var path = require('path');

module.exports ={
  entry: ['whatwg-fetch', './js/app.js'],
  output: {
    filename: 'minimal_viewer.js',
    path: '/minimal_viewer/dist/',
    library: 'MinimalViewer'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: [
      path.resolve('./js')
    ]
  }
};
