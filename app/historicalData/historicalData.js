'use strict';

angular.module('myApp.historicalData', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/historicalData', {
    templateUrl: 'historicalData/historicalData.html',
    controller: 'HistoricalDataCtrl'
  });
}])

.controller('HistoricalDataCtrl', ['$scope', 'HistoricalDataService', function($scope, HistoricalDataService) {
  $scope.rawData = {};

//  $scope.sensorNames = HistoricalDataService.getSensorNames;
  HistoricalDataService.getRawData().then(function(response) {
    $scope.rawData = response.data;
  });

}]);