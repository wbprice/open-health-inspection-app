'use strict';

/**
 * @ngdoc directive
 * @name openHealthInspectionApp.directive:locateUser
 * @description
 * # locateUser
 */
angular.module('openHealthInspectionApp')
  .directive('locateUser', ['geolocation', function (geolocation) {
    return {
      templateUrl: './scripts/directives/locateuser-tpl.html',
      controllerAs: 'ctrl',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // element.text('this is the locateUser directive');
      },
      controller: function() {

      },
    };
  }]);
