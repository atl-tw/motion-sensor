'use strict';

angular.module('myApp.historicalData', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/historicalData', {
    templateUrl: 'historicalData/historicalData.html',
    controller: 'HistoricalDataCtrl'
  });
}])

.controller('HistoricalDataCtrl', ['$scope', 'HistoricalDataService', '$sce', function($scope, HistoricalDataService, $sce) {

//  $scope.sensorNames = HistoricalDataService.getSensorNames;
  HistoricalDataService.getRawData().then(function(response) {
    $scope.trustedRawData = $sce.trustAsHtml(response.data);
  });

}]);