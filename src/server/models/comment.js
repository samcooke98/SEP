var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Comment = new Schema({
    resourceId: {type: Schema.ObjectId, ref: 'resourceId', required: true},
    userId: { type: Schema.ObjectId, ref: 'userId', required: true },
    comment: String,
    replies: [{type: mongoose.Schema.ObjectId, required: true, ref:'Replies' }]
});

module.exports = mongoose.model('Comment', Comment);