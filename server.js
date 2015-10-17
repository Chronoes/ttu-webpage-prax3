const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('remote'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/remote/index.html'));
});

const server = app.listen(1337, function() {
  const port = server.address().port;
  /* eslint-disable */
  console.log('Listening on ' + port);
  /* eslint-enable */
});
