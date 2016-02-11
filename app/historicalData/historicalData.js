'use strict';

angular.module('myApp.historicalData', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/historicalData', {
    templateUrl: 'historicalData/historicalData.html',
    controller: 'HistoricalDataCtrl'
  });
}])

.controller('HistoricalDataCtrl', ['$scope', 'MotionSensorDataService', '$sce', function($scope, MotionSensorDataService, $sce) {

  MotionSensorDataService.getRawData().then(function(response) {
    $scope.trustedRawData = $sce.trustAsHtml(response.data);
  });

}]);