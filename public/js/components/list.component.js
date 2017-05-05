(function() {
  'use strict';

  angular.module('app')
    .component('list', {
      controller: controller,
      bindings: {
        list: '<',
        deleteList: '&',
        deleteTask: '&',
        addTask: '&',
        updateTask: '&'
      },
      templateUrl: '/js/components/list.template.html'
    });

    function controller() {
      const vm = this;

      vm.$onInit = function() {
        vm.currentTask = 0;
        vm.currentList = 0;
        vm.clickedTask = 0;
        vm.clickedList = 0;
        vm.listToAddTo = 0;
        vm.newTask = '';
        vm.updatedTask = '';
        vm.editing = false;
      }

      vm.toggleHoverTask = function(task, list) {
        vm.currentTask = task;
        vm.currentList = list;
      }

      vm.showEditOpt = function(taskId, listId) {
        if (vm.currentTask === taskId && vm.currentList === listId && !vm.editing) {
          return true;
        }

        return false;
      }

      vm.toggleEditForm = function(taskId, task, listId) {
        vm.updatedTask = task;
        vm.editing = !vm.editing;
        vm.clickedTask = taskId;
        vm.clickedList = listId;
      }

      vm.showEditForm = function(taskId, listId) {
        if (vm.clickedTask === taskId && vm.clickedList === listId) {
          return true;
        }

        return false;
      }

      vm.toggleAddForm = function(list) {
        vm.listToAddTo = list;
        vm.newTask = '';
      }

      vm.showAddForm = function(listId) {
        if (vm.listToAddTo === listId) {
          return true;
        }

        return false;
      }
    }
})();
