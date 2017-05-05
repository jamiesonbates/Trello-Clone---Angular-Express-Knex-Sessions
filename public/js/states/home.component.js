(function() {
  'use strict';

  angular.module('app')
    .component('home', {
      controller,
      templateUrl: '/js/states/home.template.html'
    });

  controller.$inject = [
    '$state',
    'usersService',
    'listsService',
    'tasksService'
  ];

  function controller($state, usersService, listsService, tasksService) {
    const vm = this;

    vm.$onInit = function() {
      vm.isAuthorized = false;
      vm.userId = '';

      usersService.attemptToAuthorize()
        .then((res) => {
          if (res.data === 'Unauthorized') {
            $state.go('login');
            return;
          }

          const userId = res.data.id;

          vm.userId = userId;

          return listsService.getList(vm.userId);
        })
        .then((lists) => {
          vm.lists = lists;
          vm.isAuthorized = true;
        });
    }

    vm.addList = function(title) {
      listsService.postList(title, vm.userId)
        .then(() => {
          return listsService.getList(vm.userId);
        })
        .then((lists) => {
          vm.lists = lists;
        });
    }

    vm.deleteList = function(listId) {
      listsService.deleteList(listId)
        .then(() => {
          return listsService.getList(vm.userId);
        })
        .then((lists) => {
          vm.lists = lists;
        });
    }

    vm.deleteTask = function(taskId) {
      tasksService.deleteTask(taskId)
        .then(() => {
          return listsService.getList(vm.userId);
        })
        .then((lists) => {
          vm.lists = lists;
        });
    }

    vm.updateTask = function(taskId, update) {
      tasksService.updateTask(taskId, update)
        .then(() => {
          return listsService.getList();
        })
        .then((lists) => {
          vm.lists = lists;
        });
    }

    vm.addTask = function(listId, addition) {
      tasksService.postTask(listId, addition)
        .then(() => {
          return listsService.getList();
        })
        .then((lists) => {
          vm.lists = lists;
        });
    }
  }
})();
