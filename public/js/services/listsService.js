(function() {
  'use strict';

  angular.module('app')
    .service('listsService', service);

  service.$inject = ['$http'];
  function service($http) {
    this.getList = function(userId) {
      return $http.get(`/api/lists/${userId}`)
        .then((res) => {
          return res.data;
        });
    }

    this.postList = function(list) {
      return $http.post('/api/lists', { list })
        .then((res) => {
          return res.data;
        });
    }

    this.deleteList = function(listId) {
      return $http.delete(`/api/lists/${listId}`)
        .then((res) => {
          return res.data;
        });
    }
  }
})();
