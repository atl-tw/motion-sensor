'use strict';

angular.module('myApp.HistoricalDataService', [])
.factory('HistoricalDataService', function($http) {

    var service = {};

    service.getRawData = function() {
        return $http.get('http://localhost:4666/rawdata');
    };

    service.getSensorNames = function() {
        $http.get('http://localhost:4666/rawdata/distinct/name').then(function(response) {
            return response.data;
        });
    };

    service.getSensorData = function(sensorName) {
        $http.get('http://localhost:4666/rawdata/sensor/' + sensorName).then(function(response){
            return response.data;
        });
    };

    return service;
});