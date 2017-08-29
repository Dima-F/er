var mongoose = require('mongoose');

var OrgSchema = new mongoose.Schema({
    source:{type:mongoose.Schema.Types.ObjectId, ref:'Source'},
    title:{type:String},
    ask:{type:String},
    bid:{type:String}
});

module.exports = mongoose.model('Organization', OrgSchema);