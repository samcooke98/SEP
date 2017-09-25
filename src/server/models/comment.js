var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Comment = new Schema({
    resourceId: { type: ObjectId, required: true }, //Probably redundant ? 
    userId: { type: ObjectId, required: true },
    comment: String,
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Comment', Comment);