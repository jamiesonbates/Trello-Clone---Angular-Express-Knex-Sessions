(function() {
  'use strict';

  angular.module('app')
    .component('home', {
      controller,
      template: `
        <header>
          <h1>ToDoly</h1>
        </header>

        <main>
          <new-list add-list="$ctrl.addList(title)"></new-list>

          <div class="all-lists">
            <div class="list" ng-repeat="list in $ctrl.lists">
              <list
                list=list
                delete-list="$ctrl.deleteList(listId)"
                delete-task="$ctrl.deleteTask(taskId)"
                add-task="$ctrl.addTask(listId, addition)"
                update-task="$ctrl.updateTask(taskId, update)">
              </list>
            </div>
          </div>
        </main>
      `
    });

  controller.$inject = ['listsService', 'tasksService'];
  function controller(listsService, tasksService) {
    const vm = this;

    vm.$onInit = function() {
      listsService.getList()
        .then((lists) => {
          vm.lists = lists;
        });
    }

    vm.addList = function(title) {
      listsService.postList(title)
        .then(() => {
          return listsService.getList();
        })
        .then((lists) => {
          vm.lists = lists;
        });
    }

    vm.deleteList = function(listId) {
      listsService.deleteList(listId)
        .then(() => {
          return listsService.getList();
        })
        .then((lists) => {
          vm.lists = lists;
        });
    }

    vm.deleteTask = function(taskId) {
      tasksService.deleteTask(taskId)
        .then(() => {
          return listsService.getList();
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
