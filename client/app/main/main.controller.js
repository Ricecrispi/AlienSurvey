'use strict';
(function() {

  function MainController($scope) {

    $scope.next = function () {
      $state.go('question');
    };

}

angular.module('alienSurveyApp')
  .controller('MainController', MainController);

})();
