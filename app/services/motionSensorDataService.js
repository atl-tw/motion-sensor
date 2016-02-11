'use strict';

angular.module('myApp.MotionSensorDataService', [])
.factory('MotionSensorDataService', function($http) {

    var service = {};

    service.getRawData = function() {
        return $http.get('http://atliot.com:4666/rawdata');
    };

    service.getSensorNames = function() {
        return $http.get('http://atliot.com:4666/rawdata/distinct/name');
    };

    service.getSensorData = function(sensorName) {
        return $http.get('http://atliot.com:4666/rawdata/sensor/' + sensorName);
    };

    service.getDataForDate = function(date) {
        return $http.get('http://atliot.com:4666/rawdata/date/' + date);
    };

    return service;
});