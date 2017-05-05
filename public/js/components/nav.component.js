(function() {
  'use strict';

  angular.module('app')
    .component('nav', {
      templateUrl: '/js/components/nav.template.html',
      bindings: {
        isAuthorized: '<'
      },
      controller
    })

  controller.$inject = ['$state', 'usersService'];
  function controller($state, usersService) {
    const vm = this;

    vm.signOut = function() {
      usersService.deleteToken()
        .then((user) => {
          $state.go('login');
        })
    }
  }
})();
