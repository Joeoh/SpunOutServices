angular.module('spServicesApp', [
  'ngRoute',
  'spServicesApp.controllers'
]).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', { templateUrl: 'partials/services.html', controller: 'ServicesCtrl' });
    $routeProvider.otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true).hashPrefix('!');
}]);
