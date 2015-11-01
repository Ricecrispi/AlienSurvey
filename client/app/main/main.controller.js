'use strict';
(function() {

  function MainController($scope) {
    $state.go('intro');

}

angular.module('alienSurveyApp')
  .controller('MainController', MainController);

})();
