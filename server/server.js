'use strict';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const knex = require('../knex');

const app = express();
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'node_modules')));

app.use('/api', require('./routes/lists'));
app.use('/api', require('./routes/tasks'));
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/token'));

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

app.use('*', (req, res, next) => {
  res.sendFile('index.html', { root: path.join(__dirname, '..', 'public')});
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
