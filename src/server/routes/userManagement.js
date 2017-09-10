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

router.post('/reset/confirmAction', function(req, res) {
    //Put new password into the db
    ResetLinkController.changePassword(req.body.RID,req.body.password,res)
});


router.get('/feed', isLoggedIn, UserController.getFeed);

router.post("/login", passport.authenticate('local'), (req, res) => {
    console.log(req.user);
    res.json(sendPayload("Successfully Logged In"))
})

router.get("/logout", UserController.logout)

router.get("/user", isLoggedIn, UserController.getDetails)



module.exports = router;