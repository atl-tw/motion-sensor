'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {
  var client;

  var mqttServer = 'askKianaforServerName.us';

  function connectMqttClient() {
    console.log("connecting mqtt client");
    client = new Paho.MQTT.Client(mqttServer, 8080, 'clientId');
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({onSuccess:onConnect});
  };

  function onConnect() {
    console.log("onConnect");
    client.subscribe("topic");
    var message = new Paho.MQTT.Message("webapp onConnect");
    message.destinationName = "topic";
    client.send(message);
  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
  }

  connectMqttClient();
}]);