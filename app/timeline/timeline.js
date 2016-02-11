'use strict';

angular.module('myApp.timeline', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/timeline', {
    templateUrl: 'timeline/timeline.html',
    controller: 'TimelineCtrl'
  });
}])

.controller('TimelineCtrl', ['$scope', '$timeout', 'MotionSensorDataService', 'VisDataSet', function($scope, $timeout, MotionSensorDataService, VisDataSet) {
    var graph2d;
    var dataGroups = new VisDataSet();
    var dataItems = new VisDataSet();

    function loadGroups(data) {
        _.forEach(data, function(room) {
            dataGroups.add({'id': room, 'content': room});
        });
    };

    function loadData(data) {
        _.forEach(data, function(item){
            dataItems.add({
                'content': ' ',
                'group': item.name,
                'start': item.startTimestamp,
                'end': item.endTimestamp,
                'type': 'range',
                'title': item.time + " seconds"
            });
        });
    };


        /////////////////////////////////////// EVENTS
        $scope.onRangeChange = function (period) {
            console.log("Range changing", period);
            function splitDate(date) {
                var m = moment(date);
                return {
                    year: m.get('year'),
                    month: {
                        number: m.get('month'),
                        name: m.format('MMM')
                    },
                    week: m.format('w'),
                    day: {
                        number: m.get('date'),
                        name: m.format('ddd')
                    },
                    hour: m.format('HH'),
                    minute: m.format('mm'),
                    second: m.format('ss')
                };
            }

            var p = {
                s: splitDate(period.start),
                e: splitDate(period.end)
            };

            // Set the window for so the appropriate buttons are highlighted
            // We give some leeway to the interval -:
            // A day, +/- 1 minutes
            // A week, +/- 1 hour
            // A month is between 28 and 32 days
            var interval = period.end - period.start;
            if (interval > 86340000 && interval < 86460000) {
                $scope.graphWindow = 'day';
            }
            else if (interval > 601200000 && interval < 608400000) {
                $scope.graphWindow = 'week';
            }
            else if (interval > 2419200000 && interval < 2764800000) {
                $scope.graphWindow = 'month';
            }
            else {
                $scope.graphWindow = 'custom';
            }

            if (p.s.year == p.e.year) {
                $scope.timelineTimeline =
                    p.s.day.name + ' ' + p.s.day.number + '-' + p.s.month.name + '  -  ' +
                    p.e.day.name + ' ' + p.e.day.number + '-' + p.e.month.name + ' ' + p.s.year;

                if (p.s.month.number == p.e.month.number) {
                    $scope.timelineTimeline =
                        p.s.day.name + ' ' + p.s.day.number + '  -  ' +
                        p.e.day.name + ' ' + p.e.day.number + ' ' +
                        p.s.month.name + ' ' + p.s.year;

                    if (p.s.day.number == p.e.day.number) {
                        if (p.e.hour == 23 && p.e.minute == 59 && p.e.second == 59) {
                            p.e.hour = 24;
                            p.e.minute = '00';
                            p.e.second = '00';
                        }

                        $scope.timelineTimeline =
                            p.s.hour + ':' + p.s.minute + '  -  ' +
                            p.e.hour + ':' + p.e.minute + ' ' +
                            p.s.day.name + ' ' + p.s.day.number + ' ' + p.s.month.name + ' ' + p.s.year;
                    }
                }
            }
            else {
                $scope.timelineTimeline =
                    p.s.day.name + ' ' + p.s.day.number + '-' + p.s.month.name + ', ' + p.s.year + '  -  ' +
                    p.e.day.name + ' ' + p.e.day.number + '-' + p.e.month.name + ', ' + p.e.year;
            }

            // Call apply since this is updated in an event and angular may not know about the change!
            if (!$scope.$$phase) {
                $timeout(function () {
                    $scope.$apply();
                }, 0);
            }
        };

        $scope.onRangeChanged = function (period) {
            console.log("Range changed", period);
        };

       $scope.onLoaded = function (graphRef) {
            console.log("timeline loaded callback", graphRef);
            graph2d = graphRef;
            graph2d.setWindow($scope.startTime, $scope.stopTime);
        };

        $scope.graphEvents = {
            rangechange: $scope.onRangeChange,
            rangechanged: $scope.onRangeChanged,
            onload: $scope.onLoaded
        };

    MotionSensorDataService.getSensorNames().then(function(response){
        loadGroups(response.data);

        MotionSensorDataService.getDataForDate('02-04-2016').then(function(response){
            loadData(response.data.values);

            $scope.graphData = {
                items: dataItems,
                groups: dataGroups
            };

            $scope.graphOptions = {
                height:"100%",
                groupOrder: 'content',
                start: new Date(response.data.minTimestamp),
                end: new Date(response.data.maxTimestamp),
                max: new Date(response.data.maxTimestamp),
                min: new Date(response.data.minTimestamp)
            };
            $scope.graphLoaded = true;
        });
    });
}]);