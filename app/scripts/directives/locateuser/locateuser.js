'use strict';

/**
 * @ngdoc directive
 * @name openHealthInspectionApp.directive:locateUser
 * @description
 * # locateUser
 */
angular.module('openHealthInspectionApp')
  .directive('locateUser', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the locateUser directive');
      }
    };
  });
