// import Link from "../models/invitationLinks.js";
import * as LinkController from "../controllers/invitationLink.js";
import { Router } from "express";
import passport from 'passport';
import { ensureLoggedIn } from "connect-ensure-login"

var router = Router();

//
router.route("/invite/:id").get(ensureLoggedIn(), LinkController.getLink);

//Create link for the team's mongoID
//TODO: In the future, we should write a func similiar to ensureLoggedIn but to check if they are teamOwner
router.route("/invite").post(ensureLoggedIn(), LinkController.postLink)

router.route("/createinvite/:id").get( ensureLoggedIn(), LinkController.renderInvitePage ) 



export default router; 