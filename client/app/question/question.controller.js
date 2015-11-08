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
    $scope.clickedProps = new Set();

    $scope.recordClick = function (name, id) {
      $(id).data('maphilight', {'alwaysOn': true}).trigger('alwaysOn.maphilight');
      $scope.clickedProps.add(name);
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

    $('#alienImgs').maphilight({
      fillColor: '008800'
    });

    //
    //$.fn.maphilight.defaults = {
    //  fill: true,
    //  fillColor: '000000',
    //  fillOpacity: 0.2,
    //  stroke: true,
    //  strokeColor: 'ff0000',
    //  strokeOpacity: 1,
    //  strokeWidth: 1,
    //  fade: true,
    //  alwaysOn: true,
    //  neverOn: false,
    //  groupBy: false,
    //  wrapClass: true,
    //  shadow: false,
    //  shadowX: 0,
    //  shadowY: 0,
    //  shadowRadius: 6,
    //  shadowColor: '000000',
    //  shadowOpacity: 0.8,
    //  shadowPosition: 'outside',
    //  shadowFrom: false
    //}

  });
