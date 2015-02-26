'use strict';

/**
 * @ngdoc service
 * @name openHealthInspectionAppApp.geolocation
 * @description
 * # geolocation
 * Service in the openHealthInspectionAppApp.
 */
angular.module('openHealthInspectionApp')
  .service('geolocation', ['$q','$timeout', function ($q, $timeout) {
    return {

      getPosition: function() {

        var deferred, countdown;

        deferred = $q.defer();
        countdown = function() {
          deferred.reject('The request to get the user\'s location timed out.');
        };
        $timeout(countdown, 5000);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $timeout.cancel(countdown);
              deferred.resolve(position);
            },
            function(error) {

              var errorCode;

              $timeout.cancel(countdown);
              switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorCode = 'User denied the request for Geolocation.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorCode = 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    errorCode = 'The request to get user location timed out.';
                    break;
                case error.UNKNOWN_ERROR:
                    errorCode = 'An unknown error occurred.';
                    break;
              }

              deferred.reject(errorCode);

            });

            return deferred.promise;

      }
    }
  };
}]);
