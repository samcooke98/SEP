import { Router } from "express";
import { isLoggedIn, canDo } from "../utils/request.js"
import * as CommentController from "../controllers/commentController.js";
import * as TeamController from "../controllers/TeamController.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";

var router = Router();


router.get("/testcomment", (req, res) => {
    res.send("It's alive!");
})

router.post("/:resourceId/comments", isLoggedIn, async (req, res) => {
    try {
        // If we get to here, we try to insert the Resource (failure reasons: url already exists)
        console.log('hello my nigga');
        var result = await CommentController.createComment(req.params.resourceId, req.body.userId, req.body.comment, )
        //TODO: Save on the Resource (!)
        console.log(result, 'hello');
        console.log('successful', res.json(result));
    } catch (err) {
        next(err); //Apparently error-handling will handle it? 
        console.log(err);
        res.json(err);
    }
})

export default router;