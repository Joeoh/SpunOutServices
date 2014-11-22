angular.module('spServicesApp', [
  'ngRoute',
  'spServicesApp.controllers'
]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'partials/services.html', controller: 'ServicesCtrl' });
    $routeProvider.otherwise({ redirectTo: '/' });
}]);
