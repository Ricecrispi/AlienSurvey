'use strict';

describe('Directive: imageonload', function () {

  // load the directive's module and view
  beforeEach(module('alienSurveyApp'));
  beforeEach(module('app/imageonload/imageonload.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<imageonload></imageonload>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the imageonload directive');
  }));
});
