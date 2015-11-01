'use strict';
(function() {

function MainController($scope, $http) {
  var self = this;
  this.awesomeThings = [];

  $http.get('/api/things').then(function(response) {
    self.awesomeThings = response.data;
  });

}

angular.module('alienSurveyApp')
  .controller('MainController', MainController);

})();
