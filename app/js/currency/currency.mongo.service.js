'use strict';
require('./js/currency/mongo');
var Source = require('./js/currency/mongo/source');
var Organization = require('./js/currency/mongo/organization');

angular.module('currencyMod')
  .factory('Currency', ['$http','$q', 
    function ($http, $q) {
      return {
        getRates: function () {
          return $http.get('http://resources.finance.ua/ru/public/currency-cash.json');
        },
        //todo:refactor code...
        saveRates: function (data) {
          Source.findOne({ date: data.date }, function (err, finded) {
            if (err) {
              console.log(err);
              return;
            } else {
              if (finded) {
                console.log('Savings aborted. This source exists!');
                return;
              }
              var source = new Source({
                date: new Date(data.date)
              });
              console.log('Saving new source...');
              source.save(function (err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('Saving new organizations...');
                  data.organizations.forEach(function (org) {
                    try{
                      var organization = new Organization({
                      source: source._id,
                      title: org.title,
                      ask: org.currencies.USD.ask,
                      bid: org.currencies.USD.bid
                    });
                  } catch(e){
                      console.log(e);
                      return;
                    }
                    organization.save(function (err, newOrg) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log('saved '+ newOrg.title);
                      }
                    });
                  });
                }
              });
            }
          })
        },
        getDbRates:function(){
          var deferred = $q.defer();
          Organization.find({})
          .populate('source')
          .exec(function(err, orgs){
            if(err){
              deferred.reject(err);
            } else {
              deferred.resolve(orgs);
            }
          });
          return deferred.promise;
        },
        getDbBanks:function(){
          var deferred = $q.defer();
          Organization.find({})
          .select('title')
          .exec(function(err, banks){
            if(err){
              deferred.reject(err);
            } else {
              deferred.resolve(banks);
            }
          });
          return deferred.promise;
        }
      }
    }
  ]);