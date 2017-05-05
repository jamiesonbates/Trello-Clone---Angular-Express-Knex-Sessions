'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const knex = require('../../knex');
const jwt = require('jsonwebtoken');

function authorize(req, res, next) {
  console.log('in authorize');
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.claim = payload;

    next();
  });
}

function getTasks(list) {
  const promise = new Promise((resolve, reject) => {
    knex('tasks')
    .where('list_id', list.id)
    .orderBy('id')
    .returning('*')
    .then((tasks) => {
      const listObj = {
        id: list.id,
        title: list.title,
        tasks
      }

      resolve(listObj);
    });
  });

  return promise;
};

function getLists(userId) {
  return knex('lists')
    .where('user_id', userId)
    .returning('*')
    .then((lists) => {
      const promises = [];

      for (const list of lists) {
        promises.push(getTasks(list));
      }

      return Promise.all(promises);
    })
    .then((lists) => {
      return lists;
    });
};

module.exports = {
  authorize,
  getLists,
  getTasks
}
