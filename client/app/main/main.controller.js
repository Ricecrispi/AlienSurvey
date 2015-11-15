'use strict';
(function() {

  function MainController($scope, $state, $cookieStore, Restangular) {

    $scope.next = function () {

      Restangular.all('api/participants/new').post().then(function (serverJson) {
        $cookieStore.put('clicked', []);
        $cookieStore.put('objectId', serverJson.objectId);
        $state.go('training');
      });

    };


  }

angular.module('alienSurveyApp')
  .controller('MainController', MainController);

})();
