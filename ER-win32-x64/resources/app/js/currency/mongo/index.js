var mongoose = require('mongoose');
var Source = require('./source');
var Organization = require('./organization');
var connection = mongoose.connect('mongodb://root:12345@ds151153.mlab.com:51153/er').connection;

connection.on('error', function(err) { console.log(err.message); });
connection.once('open', function() {
  console.log("mongodb connection open");
});
module.exports = mongoose;