import User from "../models/account.js";
import Team from "../models/team.js"
import { sendError, sendPayload } from "../utils/apiResponse.js";

import passport from "passport";
import moment from "moment";

/**
 * Creates a user and team 
 * @param {*} req 
 * @param {*} res 
 * Expects username, password, firstName, lastName, teamName, description, category in the body of the request
 */
export function registerUser(req, res) {
    let newUser = new User({ username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName });
    User.register(newUser, req.body.password, function (err, account) {
        if (err) {
            return res.json(sendError(err));
        }
        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            //TODO: This should probably be in the team Controller

            var team = (new Team({ owner: account._id, teamName: req.body.teamName, description: req.body.description, category: req.body.category, status: 'Invalid', creationDate: new moment().utc() }))
            team.save(function (err, team) {
                if (err) {
                    console.log(err);
                    console.log("^^^ DB ERROR ^^^");
                    res.json(sendError(err));
                } else {
                    //Add the team to the user
                    account.teams.push(team._id);
                    account.save();
                    res.json(sendPayload(account));
                }
            })
        });
    });
}

/**
 * Get the Feed for the logged in user
 * @param {*} req 
 * @param {*} res 
 */
export function getFeed(req, res) {
    User.findById(req.user._id, (err, user) => {
        console.log(user);
        user.populate('teams', (err, userPopulated) => {
            let ownedTeams = [];
            let memberTeams = [];

            for (var team of userPopulated.teams) {
                console.log(team);
                if (team.owner.equals(userPopulated._id))
                    ownedTeams.push(team);
                else memberTeams.push(team);
            }
            res.json(sendPayload({ user: req.user.firstName + ' ' + req.user.lastName, ownedTeams: ownedTeams, memberTeams: memberTeams }));
        })
    })
}

export function logout(req, res) {
    req.logout();
    res.json(sendPayload("Successfully logged out"));
}


export async function getDetails(req, res) {
    var user = await User.findById(req.user._id);
    user.populate('teams',(err, result) => 
        res.json(result)
    )
}   