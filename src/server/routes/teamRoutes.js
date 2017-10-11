import * as TeamController from "../controllers/TeamController.js";
import * as UserController from "../controllers/UserController.js";

import { sendError, sendPayload } from "../utils/apiResponse.js";
import { isLoggedIn, canDo } from "../utils/request.js"

import { Router } from "express";
const router = new Router();


router.get('/team/:id/users', isLoggedIn, async (req, res) => {
    const teamID = req.params.id;
    try {
        let team = await TeamController.get(teamID).then((team) => team.populate("members").execPopulate())
        res.json(sendPayload(team.members));
    }
    catch (err) {
        console.log(err);
        res.json(sendError("Couldn't find team")) //TODO: Better error-handling
    }
})

router.delete('/team/:id/users/:userID', isLoggedIn, async (req, res) => {
    const teamID = req.params.id;
    const userID = req.params.userID;
    const curUser = req.user._id.str;

    if (TeamController.isOwner(curUser, teamID)) {
        if (userID !== curUser) {//Owner can't remove them self from team
            res.json(await TeamController.removeFromTeam(userID, teamID));
            return;
        } else {
            console.log(curUser, teamID);
            res.json(sendError("You can't leave if you're the team owner"));
            return;
        }
    } else {
        res.json(sendError("You can't remove people from this team!"));
    }
})

router.post("/team", isLoggedIn, async (req, res) => {
    //Create a new teamm
    const teamName = req.body.name;
    const teamDesc = req.body.description;
    const userID = req.user._id;
    try {
        const result = await TeamController.createTeam(teamName, teamDesc, userID);
        res.json(sendPayload(result));
    } catch (err) {
        console.warn(err);
        res.json(sendError(err))
    }
})

export default router;