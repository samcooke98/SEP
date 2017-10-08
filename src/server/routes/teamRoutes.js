import * as TeamController from "../controllers/TeamController.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";

import { Router } from "express";
const router = new Router();


router.get("team-test", (req, res) => res.json({ msg: "Alive!" }));


router.get('/team/:id/users', async (req, res) => {
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


export default router;