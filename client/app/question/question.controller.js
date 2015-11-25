'use strict';

angular.module('alienSurveyApp')
  .controller('QuestionCtrl', function ($scope, Restangular, $state, $stateParams, $cookieStore, $interval) {
    // array of alien images
    $scope.questions = [];
    // current question #
    $scope.curQuestion = 0;
    $scope.clickedProps = new Set();
    $scope.time = parseInt($cookieStore.get('time'));

    $scope.recordClick = function (name, id) {
      if ($scope.question.numProps != $scope.clickedProps.size) {
        $(id).data('maphilight', {'alwaysOn': true}).trigger('alwaysOn.maphilight');
        $scope.clickedProps.add(name);
      }
      ;

      //if ($scope.question.numProps == $scope.clickedProps.size) {
      //  $scope.next();
      //}
      //;

    };

    $scope.next = function () {
      if ($stateParams.id == $scope.questions.length - 1) {
        var arr = $cookieStore.get('clicked');
        arr.push(Array.from($scope.clickedProps));
        $cookieStore.put('clicked', arr);
        $cookieStore.put('time', $scope.time);
        $state.go('end');
      } else {
        var arr = $cookieStore.get('clicked');
        arr.push(Array.from($scope.clickedProps));
        $cookieStore.put('clicked', arr);
        $cookieStore.put('time', $scope.time);
        $state.go('question', {id: parseInt($stateParams.id) + 1});
      }
      ;

    };

    $scope.getQuestions = function (answer) {
      Restangular.all('api/questions/').getList().then(function (serverJson) {
        $scope.question = serverJson[parseInt($stateParams.id)];
        $scope.questions = serverJson;
        $scope.$broadcast('timer-start');
      });
    };


    $scope.saveAnswers = function () {
      Restangular.all('api/participants/')
        .post({
          answers: $cookieStore.get('clicked'),
          objectId: $cookieStore.get('objectId')
        }).then(function (serverJson) {
        $state.go('end');
      });
    };

    var stop;
    $scope.timer = function () {
      if (angular.isDefined(stop)) return;

      stop = $interval(function () {
        if ($scope.question.numProps == $scope.clickedProps.size) {
          $interval.cancel(stop);
        } else if ($scope.time < 100) {
          $scope.time = $scope.time + 1;
        } else {
          $interval.cancel(stop);
          $state.go('end');
        }
      }, 1000);
    };


    //$scope.saveAnswers();

    //
    $('.alienImgs').maphilight({
      neverOn: true
    });
    //
    $scope.getQuestions();
  });
