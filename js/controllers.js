angular.module('spServicesApp.controllers', [])
  .controller('MainCtrl', ['$scope', function($scope) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.location = position.coords;
        $scope.$apply();
      });
    }
    $scope.categories = [
    {
      string: "mental",
      title: "Mental Health",
      image: "mdi-social-mood",
    },
    {
      string: "mental",
      title: "Sexual Health",
      image: "mdi-action-favorite"
    },
    {
      string: "mental",
      title: "Alcohol",
      image: "mdi-maps-local-bar"
    },
    {
      string: "mental",
      title: "Drugs",
      image: "mdi-maps-local-bar"
    },
    {
      string: "mental",
      title: "Education",
      image: "mdi-social-school"
    },
    {
      string: "mental",
      title: "Personal Finance",
      image: "mdi-editor-attach-money"
    }];

    $scope.changePage = function(string) {
      window.location.href = '#/services/' + string + '/' + $scope.location.latitude + '/' + $scope.location.longitude;
    }
}])
  .controller('ServicesCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.done = false;
    $scope.service = $routeParams.category;
    var location = {
      latitude: parseFloat($routeParams.lat),
      longitude: parseFloat($routeParams.lng)
    };

    var titles = {
      mental: 'Mental Health',
      sexual: 'Sexual Health',
      alcohol: 'Alcohol',
      drugs: 'Drugs',
      education: 'Education',
      finance: 'Personal Finance'
    };

    $scope.title = titles[$scope.service];

    var cats = {
      mental: [
      'mental',
      'health',
      'teenline',
      'suicide',
      'youth',
      'self',
      'harm',
      'depression',
      'teen',
      'line',
      'selfharm',
      'panic',
      'loneliness',
      'bereavement',
      'counselling',
      'stress',
      'anxiety',
      'prevention',
      'sexuality',
      'separation',
      'family',
      'divorce',
      'emotional',
      'support',
      'domestic',
      'gender',
      'psychotherapy',
      'homophobia',
      'bipolar'
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

    $scope.changePage = function(page) {
      window.location.href = page;
    }
}]);