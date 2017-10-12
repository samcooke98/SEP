import Comment from "../models/comment.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";
import * as ResourceController from "./resourceController.js";
import * as UserController from "./UserController.js";
import * as NotificationController from "./NotificationController.js";

export async function createComment(resource, user, comment, triggerUser, taggedUsers) {
    const newComment = new Comment({ resourceId: resource, userId: user, comment});
    try {
        await ResourceController.addComment(newComment._id, resource); 
        await newComment.save();

        /* Now we get notifications */
        //TODO: Long term we need unique username  <- This is really important. 
        console.log(taggedUsers);
        if(taggedUsers != null )  {
            console.log("here");
            Promise.all(taggedUsers.map( (userId) => {
                NotificationController.notifyUser(
                    userId, 
                    triggerUser._id, 
                    `${triggerUser.firstName} ${triggerUser.lastName} tagged you in a comment`, 
                    `/resource/${resource}/comments`, 
                    true
                )
            }))
        }   

        if (newComment) {
            return sendPayload(newComment); 
        } 
    } catch (err) {
        console.log(err);
        return sendError(err);
    }
}

export async function getUsersInTeam(teamID) {
    var result = await User.find({ teams: teamID }).exec();
    return result;
}

export async function getID(commentId) {
    try {
        let res = await Resource.findById(commentId);
        console.log(res);
        return sendPayload(res);

    } catch (err) {
        return sendPayload(err);
    }
}