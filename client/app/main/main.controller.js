'use strict';
(function() {

  function MainController($scope, $state, $cookieStore, Restangular) {
    $scope.username = '';
    $scope.taken = false;

    $scope.next = function () {

      Restangular.all('api/participants/new').post({username: $scope.username}).then(function (serverJson) {
        if (serverJson == 'name taken') {
          $scope.taken = true;
        } else {
          $cookieStore.put('clicked', []);
          $cookieStore.put('time', 0);
          $cookieStore.put('objectId', serverJson.objectId);
          $state.go('training');
        }
        ;

      });

    };


  }

angular.module('alienSurveyApp')
  .controller('MainController', MainController);

})();
