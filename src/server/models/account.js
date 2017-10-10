var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    teams: [{ type: Schema.ObjectId, ref: 'Team' }], //TODO: Ensure unique-ness ($addToSet).
    notifications: [{}],
    avatarURI: {type: String, default: 'https://placeimg.com/80/80/animals'}, // String to the User's Avatar
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);