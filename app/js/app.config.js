'use strict';

angular.
  module('exchangeRates').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      $routeProvider.
        when('/', {
          template: '<home-comp></home-comp>'
        }).
        when('/live', {
          template: '<live-comp></live-comp>'
        }).
        when('/history', {
          template: '<history-comp></history-comp>'
        }).
        otherwise('/');
    }
  ]);
