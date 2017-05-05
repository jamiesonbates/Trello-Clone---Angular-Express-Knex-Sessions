'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.post('/tasks', (req, res, next) => {
  const task = req.body.task;
  const list_id = req.body.listId;

  knex('tasks')
    .insert({ task, list_id })
    .returning('*')
    .then((task) => {
      res.send(task[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/tasks', (req, res, next) => {
  const taskId = req.body.taskId;
  const task = req.body.task;

  knex('tasks')
    .update('task', task)
    .where('id', taskId)
    .returning('*')
    .then((task) => {
      res.send(task[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/tasks/:id', (req, res, next) => {
  const taskId = req.params.id;

  knex('tasks')
    .del()
    .where('id', taskId)
    .returning('*')
    .then((task) => {
      res.send(task[0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
