(function() {
  'use strict';

  angular.module('app')
    .component('login', {
      templateUrl: '/js/states/login.template.html',
      controller
    });

  controller.$inject = ['usersService'];
  function controller(usersService) {
    const vm = this;

    vm.$onInit = function() {
      vm.username = '';
      vm.password = '';
    }

    vm.loginUser = function() {
      usersService.postToken(vm.username, vm.password)
        .then((res) => {
          console.log(res);
        })
    }
  }
})();
