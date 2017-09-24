import Team from "../models/team.js"

import * as UserController from "./UserController.js";
import { notifySimple } from "../utils/pushNotify.js";

export async function get(id) {
    return Team.findById(id);
}

export async function isOwner(userID, teamID) {

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
    console.log("NOTIFY TEAM");

    //Send a notification to all users in the team ( who have notifications ) 
    var users = await UserController.getUsersInTeam(teamID);
    for (var user of users) {
        if (user._id == userID) //We skip
            continue;
        else {
            if (user.notifications && user.notifications.length != 0) {
                //TODO: loop through
                notifySimple(title, message, url, user.notification[0])
            }
        }
    }
    console.log(users);
    return;
}