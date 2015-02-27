'use strict';

/**
 * @ngdoc directive
 * @name openHealthInspectionApp.directive:locateUser
 * @description
 * # locateUser
 */
angular.module('openHealthInspectionApp')
  .directive('locateUser', [function () {
    return {
      templateUrl: './scripts/directives/locateuser-tpl.html',
      controllerAs: 'ctrl',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // element.text('this is the locateUser directive');
      },
      controller: ['$scope', 'geolocation', function($scope, geolocation) {

        $scope.getLatLngFromZip = function() {
          console.log('should return a lat/lng from zipcode: ' + $scope.zipcode);
        };

        $scope.getLatLngFromCityName = function() {
          console.log('should return a lat/lng from city: ' + $scope.city);
        };

      }],
    };
  }]);
