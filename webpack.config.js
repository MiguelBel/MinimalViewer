var path = require('path');

module.exports ={
  entry: './js/app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
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
