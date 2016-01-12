'use strict';

angular.module('myApp.heatMap', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/heatMap', {
    templateUrl: 'heatMap/heatMap.html',
    controller: 'HeatMapCtrl'
  });
}])

.controller('HeatMapCtrl', [function() {

}]);