'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.motionDetection',
  'myApp.rawData',
  'myApp.historicalData',
  'myApp.QueueReader',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/motionDetection'});
}]);
