'use strict';

angular.module('myApp.heatMap', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/heatMap', {
    templateUrl: 'heatMap/heatMap.html',
    controller: 'HeatMapCtrl'
  });
}])

.controller('HeatMapCtrl', ['$scope', 'QueueReader', function($scope, QueueReader) {

  function callback(message) {
    //    turn sensors red/green/blue here
  }

  QueueReader.connectMqttClient(callback);

}]);