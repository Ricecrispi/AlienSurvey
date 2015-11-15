'use strict';

angular.module('alienSurveyApp')
  .controller('ScoreboardCtrl', function ($scope, Restangular) {


    $scope.getAnswers = function (answer) {
      Restangular.all('api/participants/').getList().then(function (serverJson) {
        $scope.answers = serverJson;
      });
    };

    $scope.getAnswers();


  });
