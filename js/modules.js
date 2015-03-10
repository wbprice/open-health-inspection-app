(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(ngModule) {

  ngModule.directive('geocode', ['geocodeService', function(geocodeService) {

    var location,
    directive = {
      restrict: 'E',
      replace: false,
      scope: {
        callback: '='
      },
      templateUrl: '/templates/geocode.html',
      controllerAs: 'ctrl'
    };

    directive.link = function($scope) {

      $scope.invalidZip = false;

      $scope.resetZipValid = function() {
        $scope.invalidZip = false;
      };

      $scope.getLatLon = function() {

        geocodeService.getLatLon($scope.zipcode)
        .success(function(data) {

          if (data[0].zipcodes === undefined) {
            $scope.invalidZip = true;
            return;
          }

          location = {
            coords : {
              latitude: data[0].zipcodes[0].latitude,
              longitude: data[0].zipcodes[0].longitude
            }
          };

          if ($scope.callback) {
            $scope.callback(location);
          }

        })
        .error(function(data) {

        });
      };

    };

    return directive;

  }]);

  ngModule.run(['$templateCache', function($templateCache){
    $templateCache.put('/templates/geocode.html',
      require('./geocode--template.html'));
  }]);

};

},{"./geocode--template.html":3}],2:[function(require,module,exports){
module.exports = function(ngModule) {
  ngModule.factory('geocodeService', ['$http', '$q', function($http, $q){

    return {
      getLatLon: function(zip) {

        // input validation here. If input is a zip code continue. Else fail;

        var url = 'https://api.smartystreets.com/zipcode' +
                  '?auth-id=3528212138785631906' +
                  '&city=&state=&zipcode=' + zip;

        return $http.get(url);

      }
    };
  }]);
};

},{}],3:[function(require,module,exports){
module.exports = "  <label>Zip Code</label>\n  <form name=\"geocodeForm\" ng-submit=\"getLatLon()\" novalidate >\n    <div class=\"input-group form-group input-group-lg\">\n      <input class=\"form-control\" name=\"zipcode\" ng-change=\"resetZipValid()\" ng-model=\"zipcode\" ng-minlength=\"5\" ng-maxlength=\"10\" ng-pattern=\"/^\\d{5}(?:[-\\s]\\d{4})?$/\" type=\"text\" placeholder=\"Zip Code\"/>\n      <span class=\"input-group-btn\">\n        <button class=\"btn btn-default\">\n          <span class=\"glyphicon glyphicon-search\"></span>\n        </button>\n      </span>\n    </div>\n\n    <p class=\"alert alert-danger\" ng-show=\"geocodeForm.zipcode.$error.pattern && !geocodeForm.zipcode.$error.minlength\">\n      Please enter a valid 5-digit VA ZIP code\n    </p>\n\n    <p class=\"alert alert-warning\" ng-show=\"invalidZip\">\n      Invalid ZIP code\n    </p>\n\n  </form>\n";

},{}],4:[function(require,module,exports){
'use strict';

var geocodeModule = angular.module('geocodeModule', []);

require('./geocode--service.js')(geocodeModule);
require('./geocode--directive.js')(geocodeModule);

},{"./geocode--directive.js":1,"./geocode--service.js":2}],5:[function(require,module,exports){
module.exports = function(ngModule) {

  ngModule.directive('geolocation', ['geolocationService', function(geolocationService){

    var directive = {
      restrict: 'E',
      replace: false,
      scope: {
        callback: '='
      },
      templateUrl: '/templates/geolocation.html',
      controllerAs: 'ctrl'
    };

    directive.link = function($scope) {
      $scope.getLocation = function() {
        geolocationService.getLatLon()
        .then(function(position) {

          if ($scope.callback) {
            $scope.callback(position);
          }

        });
      };
    };

    return directive;

  }]);

  ngModule.run(['$templateCache', function($templateCache){
    $templateCache.put('/templates/geolocation.html',
      require('./geolocation--template.html'));
  }]);

};

},{"./geolocation--template.html":7}],6:[function(require,module,exports){
module.exports = function(ngModule) {

  ngModule.factory('geolocationService', ['$q', '$timeout', function($q, $timeout) {
    return {

      getLatLon: function() {

        var deferred = $q.defer();

        function countdown() {
          deferred.reject('The request to get user information timed out');
        }

        $timeout(countdown, 5000);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $timeout.cancel(countdown);

            deferred.resolve({
              coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            });

          }, function(error) {

            $timeout.cancel(countdown);

            var errorCode;
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
};

},{}],7:[function(require,module,exports){
module.exports = "<label>Using GPS</label>\n<form ng-submit=\"getLocation()\" class=\"input-group form-group\" novalidate>\n  <button class=\"btn btn-primary btn-lg\">GPS</button>\n</form>\n";

},{}],8:[function(require,module,exports){
'use strict';

var geolocationModule = angular.module('geolocationModule', []);

require('./geolocation--directive')(geolocationModule);
require('./geolocation--service')(geolocationModule);

},{"./geolocation--directive":5,"./geolocation--service":6}],9:[function(require,module,exports){
'use strict';

var searchModule = angular.module('searchModule', []);

require('./search--directive')(searchModule);
require('./search--service')(searchModule);

},{"./search--directive":10,"./search--service":11}],10:[function(require,module,exports){
module.exports = function(ngModule) {

  ngModule.directive('searchMenu', [function() {

    var directive = {
      restrict: 'E',
      replace: false,
      scope: {
      },
      templateUrl: '/templates/search.html',
      controllerAs: 'ctrl'
    };

    return directive;

  }]);

  ngModule.run(['$templateCache', function($templateCache){
    $templateCache.put('/templates/search.html',
      require('./search--template.html'));
  }]);

};

},{"./search--template.html":12}],11:[function(require,module,exports){
module.exports = function(ngModule) {

  ngModule.factory('searchService', [function() {
    return {

    };
  }]);

};

},{}],12:[function(require,module,exports){
module.exports = "<div id=\"searchbar\" class=\"col-xs-12 col-sm-5 col-md-4 clearfix\">\n\n  <a href=\"#/\" class=\"visible-xs\" class=\"clearfix\">\n    <img class=\"logo\" src=\"img/build/logo.png\" height=\"48px\" width=\"48px\" alt=\"logo\">\n  </a>\n\n  <button ng-click=\"toggleSearchField()\" class=\"btn btn-lg btn-transparent\">\n    <span id=\"searchButton\" class=\"glyphicon glyphicon-search\"></span>\n  </button>\n\n  <button ng-click=\"goToResults()\" class=\"btn btn-lg btn-transparent\" ng-if=\"isCloseButtonVisible\">\n    <span class=\"glyphicon glyphicon-remove-circle\"></span>\n  </button>\n\n  <section id=\"search\" ng-show=\"isSearchbarVisible\" class=\"col-xs-12\">\n\n    <form ng-submit=\"nameSearch(0)\" class=\" clearfix\" novalidate>\n      <span id=\"exitButton\" ng-click=\"toggleSearchField()\" class=\"col-xs-1 glyphicon glyphicon-chevron-left\"></span>\n      <input id=\"searchField\" class=\"col-xs-9\" type=\"search\" ng-model=\"query\" placeholder=\"Search for a restaurant\" focus-me=\"isSearchbarVisible\"/>\n      <button class=\"btn btn-info col-xs-2\">\n        <span id=\"searchButton\" class=\"glyphicon glyphicon-search\"/>\n      </button>\n    </form>\n\n    <section class=\"clearfix row tray drop-shadow\">\n      <ul class=\"\">\n        <li class=\"col-xs-6 searchDescription\">\n        <small>Search in:</small>{{searchAreaText}}</li>\n        <li class=\"col-xs-6 moreButton\">\n          <a ng-click=\"toggleCityJump(true)\">\n            More Cities <i class=\"fa fa-plus-circle\"></i>\n          </a>\n        </li>\n      </ul>\n    </section>\n\n  </section>\n\n  <section class=\"clearfix tray drop-shadow\" ng-show=\"isVisible\">\n    <ul>\n      <li class=\"col-xs-12\">\n        <small>Displaying results</small>\n        {{searchQuery}} <span>In</span> {{searchAreaText}}\n      </li>\n    </ul>\n  </section>\n\n</div>\n";

},{}]},{},[1,2,4,5,6,8,9,10,11]);
