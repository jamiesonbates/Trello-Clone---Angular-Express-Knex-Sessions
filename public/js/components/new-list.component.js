(function() {
  'use strict';

  angular.module('app')
    .component('newList', {
      controller,
      bindings: {
        addList: '&'
      },
      templateUrl: '/js/components/new-list.template.html'
    })

    function controller() {
      const vm = this;

      vm.$onInit = function() {
        vm.listTitle = '';
      }
    }
})();
