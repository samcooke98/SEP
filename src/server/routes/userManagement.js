var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var Team = require('../models/team');

var moment = require('moment');
import * as ResetLinkController from "../controllers/ResetLinkController.js";
import * as UserController from "../controllers/UserController.js";
import { isLoggedIn } from "../utils/request.js"

import { sendError, sendPayload } from "../utils/apiResponse.js";
import { ensureLoggedIn } from "connect-ensure-login"


router.post('/register', UserController.registerUser);


//TODO: Refactor + Confirm
router.post('/reset', function (req, res) {
    ResetLinkController.createLink(30, req.body.username)
    res.json(sendPayload("ConditionallySent"));
});

router.post('/reset/confirmAction', function (req, res) {
    //Put new password into the db
    ResetLinkController.changePassword(req.body.RID, req.body.password, res)
});


router.get('/feed', isLoggedIn, UserController.getFeed);

router.post("/login", passport.authenticate('local'), async (req, res) => {
    console.log(req.user);
    res.json(sendPayload(await UserController.getDetails(req.user._id)))
})

router.get("/logout", UserController.logout);

router.get("/user", isLoggedIn, async (req, res) => {
    var data = await UserController.getDetails(req.user._id);
    res.json(sendPayload(data));
})

router.get("/users/:teamId", isLoggedIn, async (req, res) => {
    console.log('hello');
    let teamId = req.match.teamId;
    console.log('kndkajsdskjnsadkdnkdasnkjsndkjasndk');
    var data = await UserController.getUsersInTeam(teamId);
    res.json(sendPayload(data));
})

router.post("/user/notify", isLoggedIn, async (req, res) => {
    console.log(req.body);
    var data = await UserController.addNotification(req.body, req.user._id);
    console.log(data);
    res.json(sendPayload(data));
})

router.delete("/user/notify", isLoggedIn, async (req, res) => {
    let endpoint = req.query.endpoint;
    console.log("Removing Endpoint " + endpoint + "")
    var data = await UserController.removeNotification(endpoint, req.user._id);
    res.json(data);

})



module.exports = router;