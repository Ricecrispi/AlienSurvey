'use strict';

angular.module('alienSurveyApp')
  .controller('EndCtrl', function ($scope, $cookieStore, Restangular) {

    $scope.score = $cookieStore.get('clicked').length;

    $scope.saveAnswers = function () {
      Restangular.all('api/participants/')
        .post({
          answers: $cookieStore.get('clicked'),
          objectId: $cookieStore.get('objectId')
        }).then(function (serverJson) {
        });
    };

    $scope.saveAnswers();

  });
