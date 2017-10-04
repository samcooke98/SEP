import User from "../models/account.js";
import Team from "../models/team.js"
import { sendError, sendPayload } from "../utils/apiResponse.js";
import { notifySimple } from "../utils/pushNotify.js";

import passport from "passport";
import moment from "moment";
import q from 'q';

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
            team.save(async function (err, team) {
                if (err) {
                    console.log(err);
                    console.log("^^^ DB ERROR ^^^");
                    res.json(sendError(err));
                } else {
                    //Add the team to the user
                    account.teams.push(team._id);
                    account.save();
                    res.json(sendPayload(await getDetails(req.user._id)));
                }
            })
        });
    });
}

//I really just threw together, it's shithoues. 
export async function updateUserDetails(userID, email, firstName, lastName, newPassword) {
    const deferred = q.defer();
    const update = {
        username: email,
        firstName: firstName,
        lastName: lastName,
    }
    
    if (newPassword) {
        const user = await findById(userID);
        user.setPassword(newPassword, () => {
            console.log("Updated password!");
        })
    }

    User.findOneAndUpdate({ _id: userID }, {
        $set: update
    }, { new: true }, (err, updatedUser) => {
        if (err) {
            console.log("===============ERROR WHEN UPDATING USER=============");
            console.log(err);
            deferred.resolve(sendPayload(err));

        }
        else {

            deferred.resolve(sendPayload(updatedUser));

            //      res.json(sendPayload( await getDetails(req.user._id)));
        }
    });

    return deferred.promise;
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



export async function getDetails(id) {
    var user = await User.findById(id);
    return user.populate('teams').execPopulate()
}

/**
 * 
 * @param {Object({endpoint, keys: { p256dh, auth }})} notifyPayload 
 * @param {} userID - ID of the User to add
 */
export async function addNotification(notifyPayload, userID) {
    console.log(notifyPayload);
    console.log("^^^");
    var user = await User.findById(userID);
    //TODO: Currently storing arbitary data - WE must validate the data at some point

    //Check if the endpoint already exists 
    if (user.notifications.find((value) => {
        return (value.endpoint == notifyPayload.endpoint)
    })) {
        console.log("Already exists");
        return sendError("Notification already exists");
    } else {

        //Save 
        user.notifications.push(notifyPayload);
        return user.save().then(() => sendPayload("Added Notification"), (err) => {
            console.log(err)
            return sendError(err)
        })
    }
}

export async function removeNotification(endpointURL, userID) {
    let user = await User.findById(userID);

    for (let index in user.notifications) {
        let notification = user.notifications[index]
        if (notification.endpoint == endpointURL) {
            user.notifications.splice(index, 1);
            return user.save().exec().then(() => {
                return sendPayload("Successfully removed entry")

            })
        }
    }
    return sendError("Couldn't find endpoint");
}

export async function getUsersInTeam(teamID) {
    var result = await User.find({ teams: teamID }).exec();
    return result;
}

