import { Schema } from "mongoose";
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

import moment from "moment";

var invitationLink = new Schema({
    urlID: { type: String, unique: true },
    teamID: { type: ObjectId, required: true },
    expiryTime: { type: Date, required: true },
    creationTime: { type: Date, default: Date.now },
    valid: { type: Boolean, default: true }
});


invitationLink.methods.checkValidity = function () {
    if (moment(this.expiryTime).isBefore(moment())) {
        this.valid = false;
        this.save();
        return false;
    } else {
        return true;
    }
}


export default mongoose.model('Link', invitationLink);