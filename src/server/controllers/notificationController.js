import Notification from "../models/notification.js";
import { get as getTeamObj } from "./TeamController.js";
import { getDetails as getUser } from "./UserController.js"
export function createNotification() {

}

//Add to the notification property on the user 
export async function notifyTeam(teamID, triggerUser, description, url, shouldPush) {
    console.log("Notifying team");
    const notification = new Notification({
        url: url,
        triggerPerson: triggerUser,
        team: teamID,
        description: description,
    });
    notification.save();
    const teamObj = await getTeamObj(teamID);

    teamObj.members.map(async (id) => {
        if (id.equals(triggerUser)) return;
        const user = await getUser(id);
        user.addNotification(notification);
        if (shouldPush) user.notify(notification.description, '', url);
    })
    //for users in the team
    //add the notification object
    //send push notifications

}

export async function notifyUser ( userId, triggerUser, description, url, shouldPush ) { 
    console.log("HERE");
    const notification = new Notification({ 
        url,
        triggerPerson: triggerUser,
        description: description,
    });
    notification.save();
    console.log("Notification Controller");

    const userObj = await getUser(userId);
    console.log("Adding notification");
    userObj.addNotification(notification._id);
    console.log("here");
    await userObj.save();

    if(shouldPush) 
        userObj.notify(description, '', url);

}