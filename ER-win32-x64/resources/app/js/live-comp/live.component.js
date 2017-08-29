'use strict';

angular.
  module('liveComp').
  component('liveComp', {
    templateUrl: 'js/live-comp/live.template.html',
    controller: ['Currency',
      function LiveController(Currency) {
        var self=this;
        self.limit=10;
        self.order="currencies.USD.ask";
        self.rates = null;
        (function () {
          Currency.getRates().then(function (result) {
            self.rates = result.data;
            Currency.saveRates(result.data);
          });
        }());
      }
    ]
  });