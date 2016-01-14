'use strict';

angular.module('myApp.QueueReader', [])
.factory('QueueReader', function() {
    var queueReader = {};
    var client;

    var mqttServer = 'askKianaforServerName.com';
    mqttServer = 'atliot.com';

  queueReader.connectMqttClient = function(clientId, callback){
    client = new Paho.MQTT.Client(mqttServer, 8080, clientId);
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = callback;

    client.connect({onSuccess:onConnect});
  };

  queueReader.publishMessage = function(message) {
    var mqttMessage = new Paho.MQTT.Message(message);
    mqttMessage.destinationName = "topic";
    client.send(mqttMessage);
  }

  function onConnect(){
    client.subscribe("topic");
  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  return queueReader;
});