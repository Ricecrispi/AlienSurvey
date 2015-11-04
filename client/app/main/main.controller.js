'use strict';
(function() {

  function MainController($scope, $state) {

    $scope.next = function () {
      $state.go('question');
    };

}

angular.module('alienSurveyApp')
  .controller('MainController', MainController);

})();
