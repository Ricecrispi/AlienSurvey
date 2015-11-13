'use strict';
(function() {

  function MainController($scope, $state, $cookieStore) {

    $scope.next = function () {
      $cookieStore.put('clicked', []);
      $state.go('question', {id: 0});
    };


  }

angular.module('alienSurveyApp')
  .controller('MainController', MainController);

})();
