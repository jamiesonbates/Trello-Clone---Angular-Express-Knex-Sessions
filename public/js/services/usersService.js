(function() {
  'use strict';

  angular.module('app')
    .service('usersService', service);

  service.$inject = ['$state', '$http'];
  function service($state, $http) {
    this.attemptToAuthorize = function() {
      return $http.get('/api/users')
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err;
        });
    }

    this.loginUser = function(username, password) {
      $http.post('/api/token', { username, password })
        .then((user) => {
          
        })
    }
  }
})();
