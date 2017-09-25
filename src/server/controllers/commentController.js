import Comment from "../models/comment.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";

export async function createComment(resourceId, userId, comment) {
    var newComment = new Comment({ resourceId: resourceId, userId: userId, comment: string});
    console.log('newComment');
     //You should probably also store on the resource ID 
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

export async function getID(commentId) {
    try {
        let res = await Resource.findById(commentId);
        console.log(res);
        return sendPayload(res);

    } catch (err) {
        return sendPayload(err);
    }
}