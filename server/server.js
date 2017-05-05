'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const knex = require('../knex');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'node_modules')));

app.use('/api', require('./routes/lists'));
app.use('/api', require('./routes/tasks'));

app.use('*', (req, res, next) => {
  res.sendFile('index.html', { root: path.join(__dirname, '..', 'public')});
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
