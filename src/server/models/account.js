var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

import { notifySimple} from "../utils/pushNotify.js";

var Account = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    teams: [{ type: Schema.ObjectId, ref: 'Team' }], //TODO: Ensure unique-ness ($addToSet).
    notificationsURL: [{}], //Push notifications
    notifications: [{type: Schema.ObjectId, ref: "Notification", required: false}], //The Actual notification objects
    avatarURI: {type: String, default: '', required: false}, // String to the User's Avatar
});

Account.plugin(passportLocalMongoose);

//Not => because we have to bind
Account.methods.notify = function ( title, body, url ) { 
    this.notificationsURL.map( (pushObj) => { 
        notifySimple(title, body, url, pushObj);
    })
}

Account.methods.addNotification = function ( notificationID ) {
    this.notifications.push(notificationID) 
    this.save();
}

module.exports = mongoose.model('Account', Account);