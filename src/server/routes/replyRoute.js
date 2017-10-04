import { Router } from "express";
import { isLoggedIn, canDo } from "../utils/request.js"
import * as CommentController from "../controllers/commentController.js";
import * as TeamController from "../controllers/TeamController.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";
import * as ReplyController from "../controllers/replyController.js";

var router = Router();


router.get("/testreply", (req, res) => {
    res.send("It's alive!");
})

router.post("/:resourceId/comments/:commentId/replies", isLoggedIn, async (req, res) => {
    try {
        // If we get to here, we try to insert the Resource (failure reasons: url already exists)
        var result = await ReplyController.createReply(req.params.commentId, req.body.userId, req.body.reply )
        res.json(result);
        //TODO: Save on the Resource (!)
    } catch (err) {
        next(err); //Apparently error-handling will handle it? 
        console.log(err);
        res.json(err);
    }
})

export default router;