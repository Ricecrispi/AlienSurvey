'use strict';

angular.module('alienSurveyApp')
  .controller('QuestionCtrl', function ($scope) {
    // array of alien images
    $scope.questions = [];
    // current question #
    $scope.curQuestion = null;
    // array of {x: , y:}
    $scope.mouseClickLocations = [];

    $scope.recordClick = function (event) {

    };

    $scope.saveAnswers = function () {
      Restangular.all('api/participant/').post({answers: $scope.mouseClickLocations}).then(function (serverJson) {
        $state.go('end');
      });
    };

    $scope.getQuestions = function (answer) {
      Restangular.all('api/question/').getList().then(function (serverJson) {
        $state.questions = serverJson;
      });
    };

    $scope.next = function () {
      if ($scope.curQuestion < 5) {
        $scope.curQuestion += 1;
      } else {
        $scope.saveAnswers();
      }
      ;
    };
  });
