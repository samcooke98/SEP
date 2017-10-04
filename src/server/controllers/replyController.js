import Comment from "../models/comment.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";
import * as ResourceController from "./resourceController.js";
import * as CommentController from "./commentController.js";

export async function createReply(comment, user, reply) {
    var newReply = new Reply({ commentId: comment, userId: user, reply});
     //You should probably also store on the resource ID 
    try {
        await CommentController.addReply(newReply._id, comment); 
        await newReply.save();
        if (newReply) {
            return sendPayload(newReply); 
        } 
    } catch (err) {
        console.log(err);
        return sendError(err);
    }
}

export async function getID(replyID) {
    try {
        let com = await Comment.findById(replyID);
        console.log(com);
        return sendPayload(com);

    } catch (err) {
        return sendPayload(err);
    }
}