import { Router } from "express";
import { isLoggedIn, canDo } from "../utils/request.js"
        import * as ResourceController from "../controllers/resourceController.js";
import * as TeamController from "../controllers/TeamController.js";
import * as NotificationController from "../controllers/NotificationController.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";


var router = Router();


router.get("/testresource", (req, res) => {
    res.send("It's alive!");
})

router.post("/resource", isLoggedIn, canDo, async (req, res, next) => {
    try {
        // If we get to here, we try to insert the Resource (failure reasons: url already exists)
        var result = await ResourceController.createResource(req.body.url, req.body.title, req.body.description, req.user._id, req.body.team, req.body.tags)
        NotificationController.notifyTeam(req.body.team, req.user._id, `${req.user.firstName} added a new link to one of your teams`, req.body.url, true);

        // TeamController.notifyTeam(req.body.team, req.user._id, `New Link on TeamShare`, `${req.user.firstName} added a new link to your team. Click here to see it!`, req.body.url)
        res.json(result);
    } catch (err) {
        console.log(err)
        next(err); //Apparently error-handling will handle it? 
    }
})

//TODO: We should have more security (is the id in a team, that the user has access to?) - This will probably change as the DB model changes
router.get("/resource/:id", isLoggedIn, async (req, res) => {
    var result = await ResourceController.getID(req.params.id);
    res.json(result);
})

router.get("/resource", isLoggedIn, async (req, res) => {
    let team = req.query.team;
    if (!team) {
        //todo: handle appropriate 
        //Team should be a selection of the users
        team = req.user.teams[0] && req.user.teams[0]._id
    }
    var result = await ResourceController.getFromTeam(team);
    res.json(result);

})

router.get("/resource/:id/comments", isLoggedIn, async(req, res) => {
    let id = req.match.id;
    try {
        var result = await ResourceController.getID(id);
        result.populate("comments").execPopulate().then((val) => {
            res.json(sendPayload(val.comments))
        })
    } catch (err) {
        res.json(sendError(JSON.stringify(err)))
    }

})

router.delete("/resource/:resourceId/comments/:commentId", isLoggedIn, async(req, res) => {
    let rID = req.params.resourceId;
    let cID = req.params.commentId;
    try {
        var result = await ResourceController.deleteComment(rID, cID, req.user._id);
        res.json(result);
    } catch (err) {
        res.json(sendError(JSON.stringify(err)))
    }
});


router.delete("/resource/:id", isLoggedIn, async (req, res) => {
    let resourceID = req.params.id;
    var result = await ResourceController.remove(resourceID, req.user._id);
    res.json(result);
})

export default router; 