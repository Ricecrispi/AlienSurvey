'use strict';

angular.module('alienSurveyApp')
  .controller('QuestionCtrl', function ($scope, Restangular, $state) {
    // array of alien images
    $scope.questions = [];
    // current question #
    $scope.curQuestion = 0;
    // array of {x: , y:}
    $scope.mouseClickLocations = [];

    $scope.recordClick = function (event) {
      $scope.mouseClickLocations.push([event.pageX, event.pageY]);
      $scope.next();
    };

    $scope.saveAnswers = function () {
      Restangular.all('api/participants/').post({answers: $scope.mouseClickLocations}).then(function (serverJson) {
        $state.go('end');
      });
    };

    $scope.getQuestions = function (answer) {
      Restangular.all('api/questions/').getList().then(function (serverJson) {
        $scope.questions = serverJson;
      });
    };

    $scope.next = function () {
      if ($scope.curQuestion < $scope.questions.length - 1) {
        $scope.curQuestion += 1;
      } else {
        $scope.saveAnswers();
      }
      ;
    };

    $scope.getQuestions();

  });
