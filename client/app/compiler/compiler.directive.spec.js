'use strict';

describe('Directive: compiler', function () {

  // load the directive's module
  beforeEach(module('alienSurveyApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<compiler></compiler>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the compiler directive');
  }));
});
