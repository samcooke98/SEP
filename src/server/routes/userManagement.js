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

router.get("/logout", UserController.logout)

router.get("/user", isLoggedIn, async (req, res) => {
    var data = await UserController.getDetails(req.user._id);
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

router.post("/updateDetails", isLoggedIn, async (req, res, next) => {
    console.log("********************* UPDATE REQ BODY BELOW *******************");
    console.log(req.body);
    try {
        //TODO: At some point, we should be checking the passpord properly, instead of using the session to identify
        var result = await UserController.updateUserDetails(
            req.user._id, 
            req.body.email || req.user.username, 
            req.body.firstName || req.user.firstName, 
            req.body.lastName || req.user.lastName, 
            req.body.newPassword || undefined);
        console.log("RESULT:");
        console.log(result);
        res.json((result));


    }
    catch (err) {
        console.log(err);
        next(err);
    }
})



module.exports = router;