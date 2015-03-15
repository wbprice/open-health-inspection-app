module.exports = function(ngModule) {

  ngModule.directive('results', [function() {

    var searchType, lastSearch,
    directive = {
      restrict: 'E',
      replace: false,
      scope: {},
      templateUrl: '/templates/results.html',
      controllerAs: 'ctrl'
    };

    directive.link = function(scope, element, attrs) {

      scope.results = [{
        url: '/'
      }];

      if (!lastSearch) {
        for (var i = 0; i < 20; i++) {
          scope.results.push({});
        }
      } else {
        scope.results = lastSearch;
      }

    };

    directive.controller = ['$rootScope', '$location', '$scope', 'Geosearch', 'Search', function($rootScope, $location, $scope, Geosearch, Search) {

      if (!lastSearch) {
        // should open modal
      }

      $rootScope.$on('geosearchFire', function() {
        searchType = 'geosearch';
        $scope.results = Geosearch.results;
        lastSearch = Geosearch.results;
        if ($location.url() !== '/') {
          $location.url('/');
        }
      });

      $rootScope.$on('searchFire', function() {
        searchType = 'search';
        $scope.results = Search.results;
        lastSearch = Search.results;
        if ($location.url() !== '/') {
          $location.url('/');
        }
      });

      $scope.loadMore = function() {
        console.log("Clicked the button");
        if (searchType === 'search') {
          console.log('get more search results of that name?');
          $rootScope.$broadcast('moreSearch');

        } else if (searchType === 'geosearch') {
          console.log('get more search results around here.');
          $rootScope.$broadcast('moreGeosearch');
        }
      };

    }];

    return directive;

  }]);

  ngModule.run(['$templateCache', function($templateCache) {
    $templateCache.put('/templates/results.html',
      require('./../templates/results--template.html'));
  }]);

};
