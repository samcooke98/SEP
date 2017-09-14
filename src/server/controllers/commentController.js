import Comment from "../models/comment.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";

export async function createComment(userId, comment, teamId) {
    var newComment = new Comment({ userId: userId, string, teamId: teamId });

    try {
        await newComment.save();
        if (newComment) {
            return sendPayload(newComment); 
        } 
    } catch (err) {
        console.log(err);
        return sendError(err);
    }
}

export async function getID(commentID) {
    try {
        let res = await Resource.findById(commentID);
        console.log(res);
        return sendPayload(res);

    } catch (err) {
        return sendPayload(err);
    }
}