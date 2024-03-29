import { Router } from "express";
import { isLoggedIn, canDo } from "../utils/request.js"
import * as CommentController from "../controllers/commentController.js";
import * as TeamController from "../controllers/TeamController.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";

var router = Router();


router.get("/testcomment", (req, res) => {
    res.send("It's alive!");
})

router.post("/:resourceId/comments", isLoggedIn, async (req, res, next) => {
    const taggedUsers = req.body.taggedUsers;
    console.log(taggedUsers);
    try {
        // If we get to here, we try to insert the Resource (failure reasons: url already exists)
        var result = await CommentController.createComment(req.params.resourceId, req.body.userId, req.body.comment, req.user, taggedUsers )
        
        res.json(result);
        //TODO: Save on the Resource (!)
    } catch (err) {
        next(err); //Apparently error-handling will handle it? 
        console.log(err);
        res.json(err);
    }
})

// router.get("/users/:teamId", async (req, res) => {
//     try {
//         console.log(req);
//         console.log('sjkhdsksbhjkahdhkabkhdhaskhdhjksh---------------------------------------------');
//         var results = await UserController.getUsersInTeam(req.body.teamId);
//         console.log(results);
//         res.json(result);
//     } catch(error) {
//         next(err); //Apparently error-handling will handle it? 
//         console.log(err);
//         res.json(err);
//     }
// })

export default router;