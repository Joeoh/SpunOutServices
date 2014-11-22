angular.module('spServicesApp', [
  'ngRoute',
  'spServicesApp.controllers'
]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'partials/main.html', controller: 'ServicesCtrl' });
    $routeProvider.otherwise({ redirectTo: '/' });
}]);
