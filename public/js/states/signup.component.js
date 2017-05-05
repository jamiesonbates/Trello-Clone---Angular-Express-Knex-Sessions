(function() {
  'use strict';

  angular.module('app')
    .component('signup', {
      templateUrl: '/js/states/signup.template.html',
      controller
    });

  controller.$inject = ['$state', 'usersService'];
  function controller($state, usersService) {
    const vm = this;

    vm.$onInit = function() {
      vm.username = '';
      vm.password = '';
    }

    vm.signUp = function() {
      usersService.postUser(vm.username, vm.password)
        .then((res) => {
          $state.go('home');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
})();
