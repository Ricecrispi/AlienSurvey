'use strict';

angular.module('alienSurveyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('training', {
        url: '/training',
        templateUrl: 'app/training/training.html',
        controller: 'TrainingCtrl'
      });
  });
