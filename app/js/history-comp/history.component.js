'use strict';

angular.
  module('historyComp').
  component('historyComp', {
    templateUrl: 'js/history-comp/history.template.html',
    controller: ['Currency',
      function HistoryController(Currency) {
        var self=this;
        self.orgs = null;
        self.bank = 'Universal Bank';
        (function (){
          Currency.getDbRates().then(function(result){
            result.values.forEach(function(val){
              self.orgs.push({
                id:val[0],
                'source.date':val[1],
                title:val[2],
                ask:val[3],
                bid:val[4]
              });
            })
            self.orgs = result;
          });
        })();
      }
    ]
  });