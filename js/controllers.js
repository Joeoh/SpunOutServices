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
    $scope.done = false;
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
    var receivedResponses = 0;
    for (var i = 0; i < cats[$scope.service].length; i++) {
      $http.jsonp(backendUrl + baseUrl + cats[$scope.service][i] + "&callback=JSON_CALLBACK").success(function(data) {
        receivedResponses++;
        for (var j = 0; j < data.services.length; j++) {
          var serviceLocation = {
            latitude: parseFloat(data.services[j].address.latitude),
            longitude: parseFloat(data.services[j].address.longitude)
          };
          if (!(_.isNaN(serviceLocation.latitude) || _.isNaN(serviceLocation.longitude))) {
            if (geolib.getDistance(location, serviceLocation) <= 50000) {
              $scope.responses.push(data.services[j]);
            }
          }
        }
      });
    }
    if (receivedResponses == cats[$scope.service].length) {
      done = true;
    }

    pruneResponses();

    function pruneResponses() {
      $scope.responses = _.uniq($scope.responses, function(item){
        return JSON.stringify(item);
      });
    }
}]);