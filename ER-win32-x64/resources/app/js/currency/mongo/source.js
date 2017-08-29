var mongoose = require('mongoose');

var SourceSchema = new mongoose.Schema({
    date:{type:Date, unique:true}
});

module.exports = mongoose.model('Source', SourceSchema);