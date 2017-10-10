import Team from "../models/team.js"

import * as UserController from "./UserController.js";
import { notifySimple } from "../utils/pushNotify.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";


export async function addUser(userID, teamID) { 
    const team = await get(teamID);
    team.members.push(userID);
    await team.save();
    return true;
}

export async function get(id) {
    return Team.findById(id);
}


export async function isOwner(userID, teamID) {
    const team = await get(teamID)

    return team.owner.str === userID
}

export async function removeFromTeam(userID, teamID) {
    const team = await get(teamID)

    const indexOf = team.members.indexOf(userID);
    if (indexOf == -1) {
        return sendError("Member is not part of the team")
    } else {
        team.members.splice(indexOf, 1);
        UserController.removeFromTeam(userID, teamID);
        try {
            await team.save();
            return sendPayload(team);
        } catch (err) {
            console.log(err);
            return sendError("Something went wrong!");
        }
    }
}

/**
 * 
 * @param {*} teamID - The Team to notify
 * @param {*} userID - This user will be ignored
 * @param {*} title 
 * @param {*} message 
 * @param {*} url 
 */
export async function notifyTeam(teamID, userID, title, message, url) {
    //Send a notification to all users in the team ( who have notifications ) 
    var users = await UserController.getUsersInTeam(teamID);
    for (var user of users) {
        if (user._id == userID) //We skip
            continue;
        else {
            if (user.notifications && user.notifications.length != 0) {
                console.log("here");
                console.log(user.notifications)
                //TODO: loop through
                notifySimple(title, message, url, user.notifications[0])
            }
        }
    }
    console.log(users);
    return;
}