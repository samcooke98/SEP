var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Reply = new Schema({
    resourceId: {type: Schema.ObjectId, ref: 'resourceId', required: true},
    commentId: {type: Schema.ObjectId, ref: 'commentId', required: false},
    userId: { type: Schema.ObjectId, ref: 'userId', required: true },
    reply: String,
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Reply', Reply);