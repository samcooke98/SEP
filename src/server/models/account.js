var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    teams: [{ type: Schema.ObjectId, ref: 'Team' }], //TODO: Ensure unique-ness ($addToSet).
    notifications: [{}],
    avatarURI: {type: String, required: false, default: '' }, // String to the User's Avatar
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);