'use strict';

angular.module('myApp.historicalData', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/historicalData', {
    templateUrl: 'historicalData/historicalData.html',
    controller: 'HistoricalDataCtrl'
  });
}])

.controller('HistoricalDataCtrl', ['$scope', function($scope) {

}]);