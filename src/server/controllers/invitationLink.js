import Link from "../models/invitationLinks.js";

import * as UserController from "./UserController";
import * as TeamController from "./TeamController.js";

//TODO: Don't think we should be referencing other models in here? 
import User from "../models/account.js";
import Team from "../models/team.js";

import cuid from "cuid";
import moment from "moment";
import passport from "passport";

import { sendEmail } from "../utils/nodemailer.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";


export function registerOrContinue(req, res, next) {
    if (req.user) {
        next()
    } else {
        //Check validity 
        let urlID = req.params.id;
        Link.findOne({ urlID: urlID }).exec((err, link) => {
            if (!link)
                res.json(sendError("Invalid Link"));
            else if (link.checkValidity()) {
                //Render a form to allow creation of account  
                res.json(sendPayload("Authorised"));
            } else {
                res.json(sendError("Expired Link"))
            }
        })
    }
}
/**
 * Function for user to join a team 
 * @param {*} req 
 * @param {*} res 
 */
export async function createAccount(req, res) {
    //Ensure the link is valid
    let link = await Link.findOne({ urlID: req.params.urlID });
    if (link.checkValidity()) {
        //Create the user
        let newUser = new User({ username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName });
        //Create a user
        User.register(newUser, req.body.password, async (err, account) => {
            if (err) {
                return res.json(sendError(err.message));
            }
            //Authenticate the user
            passport.authenticate('local')(req, res, async function () {
                req.session.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                account.teams.push(link.teamID);
                TeamController.addUser(account._id, link.teamID);
                account.save();
                res.json(sendPayload(await account.populate('team').execPopulate()));

            });
        })
    } else
        res.json(sendError("That link has expired, sorry!"))
}

/**
 * Returns an error if the 
 * @param {Express Request Object} req 
 * @param {Express Response Object} res 
 */
export function getLink(req, res) {
    console.log(req.user);
    let id = req.params.id; //The req must have an ID 
    Link.findOne({ urlID: id }).exec((err, link) => {
        if (err) {
            console.warn("An error occured when a user tried to join");
            console.warn("-- Request Object follows --");
            console.warn(req);
            console.warn("-- Error Follows --");
            console.warn(err);
        } else {
            console.log(link);
            if (!link)
                res.send(sendError("Invalid Link"));
            else if (link.checkValidity()) {
                //Add user to team
                User.findById(req.user._id, (err, user) => {
                    console.log(user.teams.indexOf(link.teamID))
                    if (user.teams.indexOf(link.teamID) !== -1) {
                        //User can't join the same team twice
                        res.send("You've already joined this team");
                    } else {
                        user.teams.push(link.teamID);
                        user.save();
                        res.send("You joined the team");
                    }
                })
            } else {
                console.log("IS EXPIRED");
                res.render("error", { message: "Invalid Link!", error: { status: '', stack: '' } })
                //Notify that the link is now invalid has timed out
            }
        }
    })
}
/**
 * Function to create link for specific team
 * @param {*} req 
 * @param {*} res 
 * The req.body should contain an id value that specifies the id of the team to create
 * The body should also contain a string (emails) of emails that are separated by a ';'
 */
export function postLink(req, res) {
    console.log(req);
    let teamID = req.body.id;
    Team.findById(teamID, (err, team) => {
        if (!team)
            res.json(sendError("Invalid Team ID"));
        else if (!team.owner.equals(req.user._id))
            res.json(sendError("You aren't allowed to invite users"));
        else {
            //User is owner
            //Team is valid

            //Get the emails from the body of the request
            let emails = req.body.emails.split(';');
            console.log(emails);
            //Generate new link
            let link = createLink(60 * 24, team._id);

            //Email Link to emails
            for (var email of emails) {
                console.log("here");
                console.log(email);
                //TODO: Email<
                sendEmail(email, "You've been invited to join a team on TeamShare", `<a href='http://teamshare-herokuapp.com/invite/${link.urlID}'> Join the team here </a> or paste http://teamshare.herokuapp.com/invite/${link.urlID}`, true);

            }
            res.json(sendPayload("Sent the invitation"));

        }
    })
}

/**
 * 
 * @param {Integer} time - The duration that the link should last in minutes
 * @param {*} teamID 
 */
export function createLink(time, teamID) {
    let link = new Link({
        urlID: cuid(),
        teamID: teamID,
        expiryTime: moment().utc().add(time, "minutes")
    })

    link.save((err) => console.log(err));
    return link;
}

export async function getDetails(req, res) {
    let urlID = req.params.urlID;
    let link = await Link.findOne({ urlID }).exec();
    console.log(link);
    console.log(urlID)
    if (!link) {
        res.json(sendError("Invalid Link"));
    } else if (link.checkValidity() == false) {
        res.json(sendError("Link Expired"));
    } else {
        let team = await Team.findById(link.teamID)

        res.json(sendPayload(team));
    }
}

