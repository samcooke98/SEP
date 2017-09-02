import { Schema } from "mongoose";
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

import moment from "moment";

var resetLink = new Schema({
    RID: { type: String, unique: true },
    user: { type: ObjectId, required: true },
    expiryTime: { type: Date, required: true },
    creationTime: { type: Date, default: Date.now },
});


resetLink.methods.checkValidity = function () {
    if (moment(this.expiryTime).isBefore(moment())) {
        this.valid = false;
        this.save();
        return false;
    } else {
        return true;
    }
}


export default mongoose.model('ResetLink', resetLink);