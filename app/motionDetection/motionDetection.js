'use strict';

angular.module('myApp.motionDetection', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/motionDetection', {
    templateUrl: 'motionDetection/motionDetection.html',
    controller: 'MotionDetectionCtrl'
  });
}])

.controller('MotionDetectionCtrl', ['$scope', 'QueueReader', function($scope, QueueReader) {

   $scope.sensors = {
                    "5c:cf:7f:7:46:26": {"name": "kitchen", "client": "5c:cf:7f:7:46:26", "status": "inactive"},
                    "5c:cf:7f:7:8f:21": {"name": "dogwood", "client": "5c:cf:7f:7:8f:21", "status": "inactive"},
                    "5c:cf:7f:6:cf:ea": {"name": "willow", "client": "5c:cf:7f:6:cf:ea", "status": "inactive"},
                    "5c:cf:7f:7:46:7": {"name": "community", "client": "5c:cf:7f:7:46:7", "status": "inactive"},
                    "5c:cf:7f:b:65:5e": {"name": "loblolly", "client": "5c:cf:7f:b:65:5e", "status": "inactive"},
                    "5c:cf:7f:b:62:84": {"name": "entry", "client": "5c:cf:7f:b:62:84", "status": "inactive"},
                    "5c:cf:7f:b:68:49": {"name": "sassafras", "client": "5c:cf:7f:b:68:49", "status": "inactive"},
                    "5c:cf:7f:b:56:d6": {"name": "magnolia", "client": "5c:cf:7f:b:56:d6", "status": "inactive"},
                    "5c:cf:7f:b:67:8b": {"name": "sweetgum", "client": "5c:cf:7f:b:67:8b", "status": "inactive"},
                    "5c:cf:7f:b:63:be": {"name": "3dprinter", "client": "5c:cf:7f:b:63:be", "status": "inactive"}
                    };

   $scope.sensorStyle = function(client) {
      var sensor = $scope.sensors[client];
      return sensor.status + "-" + sensor.name;
   }

  function callback(message) {
    var json = parseMessage(message);
    var sensor = $scope.sensors[json.id];

    if (json) {
        if (json.motion === "Start") {
              sensor.status = "active";
            } else if (json.motion === "End") {
              sensor.status = "inactive";
            }
        $scope.$apply();
    }
  }

  function parseMessage(message) {
    return tryParseJSON(message.payloadString);
  }

  function tryParseJSON (jsonString){
      try {
          var o = JSON.parse(jsonString);
          if (o && typeof o === "object" && o !== null) {
              return o;
          }
      }
      catch (e) { }

      return false;
  };

  QueueReader.connectMqttClient('motionDetectionClient-'+UUID.generate(), callback);

}]);