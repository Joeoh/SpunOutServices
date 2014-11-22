angular.module('spServicesApp.controllers', [])
  .controller('MainCtrl', ['$scope', function($scope) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.location = position.coords;
        $scope.$apply();
      });
    }
}])
  .controller('ServicesCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    var done = false;
    $scope.service = $routeParams.category;
    var location = {
      latitude: parseFloat($routeParams.lat),
      longitude: parseFloat($routeParams.lng)
    };

    $scope.titles = {
      mental: 'Mental Health',
    };

    var cats = {
      mental: [
      'mental'
      ]
    };
    var baseUrl = 'http://api.spunout.ie/v1/search/by_category/';
    var backendUrl = 'http://json2jsonp.com/?url=';
    $scope.responses = [];
    for (var i = 0; i < cats[$scope.service].length; i++) {
      $http.jsonp(backendUrl + baseUrl + cats[$scope.service][i] + "&callback=JSON_CALLBACK").success(function(data) {
        for (var j = 0; j < data.services.length; j++) {
          var serviceLocation = {
            latitude: parseFloat(data.services[j].address.latitude),
            longitude: parseFloat(data.services[j].address.longitude)
          };
          if (!(_.isNaN(serviceLocation.latitude) || _.isNaN(serviceLocation.longitude))) {
            if (geolib.getDistance(location, serviceLocation) <= 50000) {
              console.log(data.services[j]);
              $scope.responses.push(data.services[j]);
            }
          }
        }
      });
    }
}]);