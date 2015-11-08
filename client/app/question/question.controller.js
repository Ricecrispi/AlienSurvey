'use strict';

angular.module('alienSurveyApp')
  .controller('QuestionCtrl', function ($scope, Restangular, $state) {
    // array of alien images
    $scope.questions = [
      {
        properties: [
          {url: 'assets/images/13.png', name: 'boots'},
          {url: 'assets/images/14.png', name: 'whatever'}
        ]
      }
    ];
    // current question #
    $scope.curQuestion = 0;
    // array of {x: , y:}
    $scope.mouseClickLocations = [];

    $scope.recordClick = function (name) {
      $scope.mouseClickLocations.push(name);
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

    //$scope.getQuestions();

  });
