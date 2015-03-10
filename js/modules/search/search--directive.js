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
