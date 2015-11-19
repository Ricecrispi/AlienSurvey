'use strict';

angular.module('alienSurveyApp')
  .controller('TrainingCtrl', function ($scope, $state) {
    $scope.clickedProps = 0;
    $scope.done = false;

    $scope.next = function () {
      $state.go('question', {id: 0});
    };

    $scope.recordClick = function (name, id) {
      $(id).data('maphilight', {'alwaysOn': true}).trigger('alwaysOn.maphilight');
      $scope.clickedProps += 1;
      if ($scope.clickedProps == 3) {
        $scope.done = true;
      }
      ;
    };


    $('.alienImgs').maphilight({
      neverOn: true
    });
  });
