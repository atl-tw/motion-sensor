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
    var json = parseMessage(message);
    console.log(json["client"]);
    console.log(json["new-motion"]);
    console.log(json["end-motion"]);
  }

  function parseMessage(message) {
    return JSON.parse(message.payloadString);
  }

  QueueReader.connectMqttClient('heatMapClient', callback);

}]);