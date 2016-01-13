'use strict';

angular.module('myApp.motionDetection', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/motionDetection', {
    templateUrl: 'motionDetection/motionDetection.html',
    controller: 'MotionDetectionCtrl'
  });
}])

.controller('MotionDetectionCtrl', ['$scope', 'QueueReader', function($scope, QueueReader) {

   $scope.sensors = {"esp8266-5c:cf:7f:7:46:7": {"name": "sensor1", "client": "esp8266-5c:cf:7f:7:46:7", "status": "offline-sensor"},
                  "esp8266-5c:cf:7f:7:46:26": {"name": "sensor2", "client": "esp8266-5c:cf:7f:7:46:26", "status": "offline-sensor"}};

   $scope.sensorStyle = function(sensorName) {
      var sensor = $scope.sensors[sensorName];
      return sensor.name + " sensor-attributes " + sensor.status;
   }

  function callback(message) {
    var json = parseMessage(message);
    var sensor = $scope.sensors[json.client];

    if (angular.isDefined(json["new-motion"])) {
      sensor.status = "active-sensor";
    } else if (angular.isDefined(json["end-motion"])) {
      sensor.status = "inactive-sensor";
    }

    $scope.$apply();
  }

  function parseMessage(message) {
    return JSON.parse(message.payloadString);
  }

  QueueReader.connectMqttClient('motionDetectionClient', callback);

}]);