(function() {
  'use strict';

  angular.module('app')
    .service('tasksService', service)

  service.$inject = ['$http'];
  function service($http) {
    this.postTask = function(listId, task) {
      return $http.post('/api/tasks', { listId, task })
        .then((res) => {
          return res.data;
        });
    }

    this.updateTask = function(taskId, task) {
      return $http.patch('/api/tasks', { taskId, task })
        .then((res) => {
          return res.data;
        });
    }

    this.deleteTask = function(taskId) {
      return $http.delete(`/api/tasks/${taskId}`)
        .then((res) => {
          return res.data;
        });
    }
  }
})();
