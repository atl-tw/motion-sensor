'use strict';

angular.module('myApp.motionDetection', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/motionDetection', {
    templateUrl: 'motionDetection/motionDetection.html',
    controller: 'MotionDetectionCtrl'
  });
}])

.controller('MotionDetectionCtrl', ['$scope', 'QueueReader', function($scope, QueueReader) {

   $scope.sensors = {"esp8266-5c:cf:7f:7:46:26": {"name": "kitchen", "client": "esp8266-5c:cf:7f:7:46:26", "status": "inactive"},
                    "esp8266-5c:cf:7f:7:8f:21": {"name": "conference", "client": "esp8266-5c:cf:7f:7:8f:21", "status": "inactive"},
                    "esp8266-5c:cf:7f:6:cf:ea": {"name": "front-office", "client": "esp8266-5c:cf:7f:6:cf:ea", "status": "inactive"},
                    "esp8266-5c:cf:7f:7:46:7": {"name": "collaboration", "client": "esp8266-5c:cf:7f:7:46:7", "status": "inactive"}};

   $scope.sensorStyle = function(client) {
      var sensor = $scope.sensors[client];
      return sensor.status + "-" + sensor.name;
   }

  function callback(message) {
    var json = parseMessage(message);
    var sensor = $scope.sensors[json.client];

    if (angular.isDefined(json["new-motion"])) {
      sensor.status = "active";
    } else if (angular.isDefined(json["end-motion"])) {
      sensor.status = "inactive";
    }

    $scope.$apply();
  }

  function parseMessage(message) {
    return JSON.parse(message.payloadString);
  }

  QueueReader.connectMqttClient('motionDetectionClient-'+UUID.generate(), callback);

}]);