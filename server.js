var express = require('express');
var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    stats: {
      colors: true
    }
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(process.cwd()));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname + '/test/index.test.html'));
});

app.listen(process.env.PORT, function () {
  console.log('[APP] Listening in port ' + process.env.PORT);
})
