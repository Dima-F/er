var fs = require('fs');
var path = require('path');

module.exports = function(db){
    var binaryArray = db.export();
    var buffer = new Buffer(binaryArray);
    fs.writeFileSync(path.join(__dirname,'er.sqlite'), buffer);
}