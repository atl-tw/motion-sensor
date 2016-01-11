'use strict';

angular.module('myApp.rawData', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/rawData', {
    templateUrl: 'rawData/rawData.html',
    controller: 'RawDataCtrl'
  });
}])

.controller('RawDataCtrl', ['$scope', function($scope) {
  var client;
  var mqttServer = 'askKianaforServerName.us';

  $scope.rawMessageData = [];

//  $scope.$watch('rawMessageData', function(newValue, oldValue){
//    console.log('old value: ' + oldValue + " || new value: " + newValue);
//    if (newValue != oldValue) {
//    }
//  }, true);

  function connectMqttClient() {
    client = new Paho.MQTT.Client(mqttServer, 8080, 'clientId');
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({onSuccess:onConnect});
  };

  function onConnect() {
    client.subscribe("topic");
  }

  function publishMessage(message) {
    var mqttMessage = new Paho.MQTT.Message(message);
    mqttMessage.destinationName = "topic";
    client.send(mqttMessage);
  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
    $scope.rawMessageData.push(message.payloadString);
    $scope.$apply();
  }

  connectMqttClient();
}]);