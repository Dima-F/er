var fs = require('fs');
var sql = require('sql.js');

module.exports = function(){
    var db=null;
    if(fs.existsSync('er.sqlite')){
        console.log('sqlite db exists...');
        var filebuffer = fs.readFileSync('er.sqlite');
        db = new sql.Database(filebuffer);
    } else {
        console.log('sqlite db doesnt exists...');
        db = new sql.Database();
        var query = 'CREATE TABLE source ('+
            'id integer primary key autoincrement,'+
            'date char(20) unique);';
        db.run(query);
        var query2 = 'CREATE TABLE orgs ('+
        'id integer primary key autoincrement,'+
        'source char(20) not null,'+
        'bank char not null,'+
        'bid char,'+
        'ask char)';
        db.run(query2);
    }
    return db;
}