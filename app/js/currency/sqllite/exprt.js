var fs = require('fs');

module.exports = function(db){
    var binaryArray = db.export();
    var buffer = new Buffer(binaryArray);
    fs.writeFileSync("er.sqlite", buffer);
}