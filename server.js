const express = require('express');
const spawn = require('child_process').spawn;
const path = require('path');

const app = express();

app.use(express.static('prax3'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/prax3/index.html'));
});

app.get('/cgi-bin/prax3/:file', function(req, res) {
  console.log(req.query);
  const command = spawn(path.join(__dirname, '/cgi-bin/prax3/', req.params.file), [req.query.action]);
  const output  = [];

  command.stdout.on('data', function(chunk) {
    output.push(chunk);
  });

  command.on('close', function(code) {
    if (code === 0) {
      res.send(Buffer.concat(output));
    } else {
      res.send(500);
    }
  });
});

const server = app.listen(1337, function() {
  const port = server.address().port;
  /* eslint-disable */
  console.log('Listening on ' + port);
  /* eslint-enable */
});
