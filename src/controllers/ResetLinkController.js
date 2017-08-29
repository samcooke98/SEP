import ResetLink from "../models/resetLink.js";
import User from "../models/account.js";
import cuid from "cuid";
import moment from "moment";
import passport from "passport";
import * as Mailer from '../nodemailer.js';
/**
 * Returns an error if the 
 * @param {Express Request Object} req 
 * @param {Express Response Object} res 
 */
export function resetFromRID(req, res) {
    ResetLink.findOne({RID: req.query.RID}).exec((err, link) => {
        if (err) {
            console.warn("An error occured when a user tried to join");
            console.warn("-- Request Object follows --");
            console.warn(req);
            console.warn("-- Error Follows --");
            console.warn(err);
        } else {
            console.log(link);
            if (!link)
                res.send("Invalid Link");
            else if (link.checkValidity()) {
                User.findById(link.user, (err, user) => {
                    res.render("reset", {linkFail: (user == null), RID: req.query.RID, username: user.username, confirm: true});
                });
            } else {
                console.log("IS EXPIRED");
                res.render("error", {message: "This Reset token has expired.",error:{status:""}});
            }
        }
    })
    return null;
}
export function deleteByRID(RID)
{
    ResetLink.findOne({RID: RID}).exec((err, link) => {
        link.remove();
    });
}
export function changePassword(RID, newPass, res)
{
    ResetLink.findOne({RID: RID}, (err, link) => {
        User.findOne({_id: link.user}, (errT, user) => {
            if(err || errT)
            {
                return;
            }
            user.setPassword(newPass, function () {
                user.save();
                res.render("login", {message: "Your password has been reset."});
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
    User.findOne({username: username}, (err, user) => {
        if (err)
        {
            console.log('err = ' + err);
            return;
        }
        var newRID = cuid();
        let link = new ResetLink({
            RID: newRID,
            user: user._id,
            expiryTime: moment().utc().add(time, "minutes")
        })
        var bodyText = "A password reset has been requested for your account. \n";
        bodyText += "To change your password visit the following URL: \n";
        bodyText += "http://localhost:3000/reset/confirm?RID=" + newRID + "\n";
        Mailer.sendEmail(username, "TeamShare: Reset Password", bodyText, false)
        console.log(link);
        link.save((err) => console.log(err));
    });
}

/* Test functions */
// createLink(60, '59a2cf986691f112a8f95156')

//moment.utc("2017-08-27T14:21:09.104+00:00")