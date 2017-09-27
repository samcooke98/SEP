var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    teams: [{ type: Schema.ObjectId, ref: 'Team' }], //TODO: Ensure unique-ness ($addToSet).
    notifications: [{}],
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);