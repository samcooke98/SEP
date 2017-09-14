var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Comment = new Schema({
    userId: { type: ObjectId, required: true },
    comment: String,
    teamId: {type:Schema.ObjectId, ref:'Team'} //TODO: Ensure unique-ness ($addToSet)
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Comment', Comment);