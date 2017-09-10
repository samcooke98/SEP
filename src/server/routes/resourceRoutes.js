import { Router } from "express";
import { isLoggedIn, canDo } from "../utils/request.js"
import * as ResourceController from "../controllers/resourceController.js";
import * as TeamController from "../controllers/TeamController.js";


var router = Router();


router.get("/testresource", (req, res) => {
    res.send("It's alive!");
})

router.post("/resource", isLoggedIn, canDo, async (req, res) => {
    try {
        // If we get to here, we try to insert the Resource (failure reasons: url already exists)
        var result = await ResourceController.createResource(req.body.url, req.body.description, req.user._id, req.body.team)
        res.json(result);
    } catch (err) {
        next(err); //Apparently error-handling will handle it? 
    }
})

//TODO: We should have more security (is the id in a team, that the user has access to?) - This will probably change as the DB model changes
router.get("/resource/:id", isLoggedIn, async (req, res) => {
    var result = await ResourceController.getID(req.params.id);
    res.json(result);
})



export default router; 