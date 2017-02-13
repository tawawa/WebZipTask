
var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200).send('hello');
});

module.exports = app;
