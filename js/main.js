angular.module('spServicesApp', [
  'ngRoute',
  'spServicesApp.controllers'
]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'partials/main.html', controller: 'MainCtrl' });
    $routeProvider.when('/regions', { templateUrl: 'partials/regions.html' });
    $routeProvider.when('/services/:category/:lat/:lng', { templateUrl: 'partials/services.html', controller: 'ServicesCtrl' });
    $routeProvider.otherwise({ redirectTo: '/' });
}]);
