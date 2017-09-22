import ResetLink from "../models/resetLink.js";
import User from "../models/account.js";
import cuid from "cuid";
import moment from "moment";
import passport from "passport";
import * as Mailer from '../utils/nodemailer.js';

import { sendError, sendPayload } from "../utils/apiResponse.js";


export function deleteByRID(RID) {
    ResetLink.findOne({ RID: RID }).exec((err, link) => {
        link.remove();
    });
}

export function changePassword(RID, newPass, res) {
    ResetLink.findOne({ RID: RID }, (err, link) => {
        if(!link) {
            return res.json(sendError("Token Expired"));
        }
            
        User.findOne({ _id: link.user }, (errT, user) => {
            if (err || errT) {
                res.json(sendError("Could not perform the action"));
                return;
            }
            user.setPassword(newPass, function () {
                user.save();
                res.json(sendPayload({ message: "Your password has been reset." }));
            });
            console.log('Password changed for: ' + user);
            deleteByRID(RID);
        });
    });
}
/**
 * 
 * @param {Integer} time - The duration that the link should last in minutes
 * @param {String} username  - The inputted email
 */
export function createLink(time, username) {
    console.log("CREATE LINK")
    console.log(username);
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log(username);
            console.log('err = ' + err);
            return false;
        }
        if (user !== null) {
            console.log('creating link');
            var newRID = cuid();
            let link = new ResetLink({
                RID: newRID,
                user: user._id,
                expiryTime: moment().utc().add(time, "minutes")
            })
            var bodyText = "A password reset has been requested for your account. \n";
            bodyText += "To change your password visit the following URL: \n";
            bodyText += "http://localhost:3000/reset/confirm?RID=" + newRID + "\n\n";
            bodyText += "This link will expire in 30 minutes. \n\n";
            bodyText += "Regards, \n\n";
            bodyText += "The TeamShare Team!";
            Mailer.sendEmail(username, "TeamShare: Reset Password", bodyText, false)
            link.save((err) => console.log(err));
            return true;
        } else {
            return false;
        }
    });
}

/* Test functions */
// createLink(60, '59a2cf986691f112a8f95156')

//moment.utc("2017-08-27T14:21:09.104+00:00")