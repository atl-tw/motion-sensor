'use strict';

angular.module('myApp.rawData', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/rawData', {
    templateUrl: 'rawData/rawData.html',
    controller: 'RawDataCtrl'
  });
}])

.controller('RawDataCtrl', ['$scope', 'QueueReader', function($scope, QueueReader) {

  $scope.rawMessageData = [];

  function callback(message) {
      console.log("onMessageArrived:"+message.payloadString);
      $scope.rawMessageData.push(message.payloadString);
      $scope.$apply();
  }

  QueueReader.connectMqttClient(callback);

}]);