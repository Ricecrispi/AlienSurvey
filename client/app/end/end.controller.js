'use strict';

angular.module('alienSurveyApp')
  .controller('EndCtrl', function ($scope, $cookieStore, Restangular) {

    $scope.score = 0;

    $scope.saveAnswers = function () {
      $scope.ans = $cookieStore.get('clicked');
      for (var item in $scope.ans) {
        if ($scope.ans[item].length != 0) {
          $scope.score += 1;
        }
        ;
      }
      ;



      Restangular.all('api/participants/')
        .post({
          answers: $cookieStore.get('clicked'),
          objectId: $cookieStore.get('objectId')
        }).then(function (serverJson) {
        });
    };

    $scope.saveAnswers();

  });
