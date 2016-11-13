var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(process.cwd()));

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    var fixture = [];

    for (var i = 1; i <= 30; i++) {
      fixture.push(
        { title: 'Title ' + i, url: 'http://www.' + i + '.com', id: String(i), domain: 'www.' + i + '.com' }
      );
    }

    res.send(JSON.stringify(fixture));
});

app.listen(process.env.PORT, function () {
  console.log('[APP] Listening in port ' + process.env.PORT);
})