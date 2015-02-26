'use strict';

describe('Directive: locateUser', function () {

  // load the directive's module
  beforeEach(module('openHealthInspectionApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<locate-user></locate-user>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the locateUser directive');
  }));
});
