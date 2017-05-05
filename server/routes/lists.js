'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

const util = require('./util');

router.get('/lists', (req, res, next) => {
  util.getLists()
    .then((lists) => {
      res.send(lists);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/lists', (req, res, next) => {
  const title = req.body.list;

  knex('lists')
    .insert({ title })
    .returning('*')
    .then((list) => {
      res.send(list[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/lists/:id', (req, res, next) => {
  const listId = req.params.id;

  knex('lists')
    .del()
    .where('id', listId)
    .returning('*')
    .then((list) => {
      res.send(list[0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
