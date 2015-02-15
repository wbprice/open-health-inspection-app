module.exports = function(ngModule) {

  ngModule.directive('searchFilter', function() {

    console.log('directive triggered.');

    var directive = {
      templateUrl: 'search.html',
      // template: 'Yo',
      restrict: 'E',
      replace: false,
      controllerAs: 'ctrl',
      controller: function() {
        console.log('directive here.');
      }
    }

    return directive;

  });

  ngModule.run(['$templateCache', function($templateCache) {
    $templateCache.put('search.html', require('./search.tpl.html'));
  }]);

}
