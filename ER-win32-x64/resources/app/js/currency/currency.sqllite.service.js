
var db = require('./js/currency/sqllite/start')();
var exp = require('./js/currency/sqllite/exprt');

angular.module('currencyMod')
  .factory('Currency', ['$http', '$q',
    function ($http, $q) {
      return {
        getRates: function () {
          return $http.get('http://resources.finance.ua/ru/public/currency-cash.json');
        },
        //todo:refactor code...
        saveRates: function (data) {
          var stmt = db.prepare("SELECT * FROM source WHERE date=:date");

          // Bind values to the parameters and fetch the results of the query
          var result = stmt.get({ ':date': data.date });
          if (result.length !== 0) {
            console.log('savings aborted...');
            return;
          } else {
            console.log('inserting into source...');
            db.run("INSERT INTO source (date) VALUES (:date)", { ':date': data.date });
            console.log('inserting into org...');
            data.organizations.forEach(function (org) {
              var ask = org.currencies.USD ? org.currencies.USD.ask : '';
              var bid = org.currencies.USD ? org.currencies.USD.bid : '';
              db.run("INSERT INTO orgs (source, bank, bid, ask) VALUES (:source, :bank, :bid, :ask)",
                {
                  ':source': data.date,
                  ':bank': org.title,
                  ':bid': bid,
                  ':ask': ask
                });
            });
            exp(db);
            console.log('results saved in file...');
          }
        },
        getDbRates: function () {
          var deferred = $q.defer();
          var res = null;
          try {
            res = db.exec("SELECT * FROM orgs;");
            deferred.resolve(res[0]);
          } catch (e) {
            deferred.reject(e.message);
          } finally {
            return deferred.promise;
          }
        }
      }
    }
  ]);