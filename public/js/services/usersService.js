(function() {
  'use strict';

  angular.module('app')
    .service('usersService', service);

  service.$inject = ['$state', '$http'];
  function service($state, $http) {
    this.attemptToAuthorize = function() {
      return $http.get('/api/users')
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    }

    this.postToken = function(username, password) {
      return $http.post('/api/token', { username, password })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    }

    this.deleteToken = function() {
      return $http.delete('/api/token')
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    }

    this.postUser = function(username, password) {
      return $http.post('/api/users', { username, password })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    }
  }
})();
