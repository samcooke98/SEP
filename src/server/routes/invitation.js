// import Link from "../models/invitationLinks.js";
import * as LinkController from "../controllers/invitationLink.js";
import { Router } from "express";
import passport from 'passport';
import { ensureLoggedIn } from "connect-ensure-login"
import { isLoggedIn } from "../utils/request.js"

var router = Router();

//
// router.route("/invite/:id").get(LinkController.registerOrContinue, LinkController.getLink);
router.route("/invite/:urlID").post(LinkController.createAccount);
router.route("/invite/:urlID").get(LinkController.getDetails);

//Create link for the team's mongoID
//TODO: In the future, we should write a func similiar to ensureLoggedIn but to check if they are teamOwner
router.route("/invite").post(isLoggedIn, LinkController.postLink)

// router.route("/createinvite/:id").get( ensureLoggedIn(), LinkController.renderInvitePage ) 

router.get('/testing', (req,res) => res.send("yes"));

export default router; 