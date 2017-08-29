'use strict';

angular.
  module('navbarComp').
  component('navbarComp', {
    templateUrl: 'js/navbar-comp/navbar.template.html',
    controller: ['$location', function NavbarController($location) {
      this.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
      };
    }]
  });