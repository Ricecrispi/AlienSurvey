'use strict';

angular.module('alienSurveyApp')
  .controller('QuestionCtrl', function ($scope, Restangular, $state, $stateParams, $cookieStore) {
    // array of alien images
    $scope.questions = [];
    // current question #
    $scope.curQuestion = 0;
    $scope.clickedProps = new Set();

    $scope.recordClick = function (name, id) {
      $(id).data('maphilight', {'alwaysOn': true}).trigger('alwaysOn.maphilight');
      $scope.clickedProps.add(name);
    };

    $scope.next = function () {
      if ($stateParams.id == '4') {
        $scope.saveAnswers();
      } else {

        var arr = $cookieStore.get('clicked');
        arr.push(Array.from($scope.clickedProps));
        $cookieStore.put('clicked', arr);
        $state.go('question', {id: parseInt($stateParams.id) + 1});
      }
      ;


      //if ($scope.curQuestion < $scope.questions.length - 1) {
      //  $scope.curQuestion += 1;
      //  $scope.$apply();
      //  $scope.clickedPropsAll.push(Array.from($scope.clickedProps));
      //  $scope.clickedProps = new Set();
      //  $scope.$broadcast('timer-start');
      //} else {
      //  $scope.saveAnswers();
      //}
      //;
    };

    $scope.getQuestions = function (answer) {
      Restangular.all('api/questions/').getList().then(function (serverJson) {
        $scope.question = serverJson[parseInt($stateParams.id)];
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

    //$scope.saveAnswers();

    //
    $('.alienImgs').maphilight({
      neverOn: true
    });
    //
    $scope.getQuestions();
  });
