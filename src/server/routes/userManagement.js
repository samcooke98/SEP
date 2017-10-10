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
import fileUploader from "../utils/fileUpload.js";

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

router.get("/logout", UserController.logout)

router.get("/user", isLoggedIn, async (req, res) => {
    var data = await UserController.getDetails(req.user._id);
    res.json(sendPayload(data));
})

router.get("/user/:id", isLoggedIn, async (req, res) => {
    var data = await UserController.getPublic(req.params.id);
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

router.get("/updateDetails", isLoggedIn, async (req, res) => {
    var data = await UserController.getDetails(req.user._id);
    res.json(sendPayload(data));
    console.log(req.body);

})

router.post("/updateDetails", isLoggedIn, async (req, res) => {
    var data = await UserController.updateUserDetails(req.body.email, req.body.firstName, req.body.lastName, req.body.newPassword);
    console.log(data);
    res.json(sendPayload(data));
})

router.get("/sign-s3", fileUploader)



module.exports = router;