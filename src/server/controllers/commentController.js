import Comment from "../models/comment.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";
import * as ResourceController from "./resourceController.js";

export async function createComment(resource, user, comment) {
    var newComment = new Comment({ resourceId: resource, userId: user, comment});
     //You should probably also store on the resource ID 
    try {
        await ResourceController.addComment(newComment._id, resource); 
        await newComment.save();
        if (newComment) {
            return sendPayload(newComment); 
        } 
    } catch (err) {
        console.log(err);
        return sendError(err);
    }
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

export async function addReply(replyID, commentId) { 
    try { 
        let res = await Comment.findById(commentId);
        res.replies.push(replyID);
        const success = await res.save();
        return success;
    } catch(err) { 
        console.log(err);
    }
}