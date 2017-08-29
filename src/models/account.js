var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    hash: String,
    salt: String,
    firstName: String, 
    lastName: String,
    teams: [{type:Schema.ObjectId, ref:'Team'}] //TODO: Ensure unique-ness ($addToSet)
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);