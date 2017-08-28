// import Link from "../models/invitationLinks.js";
import * as LinkController from "../controllers/invitationLink.js";
import { Router } from "express";
import passport from 'passport';
import { ensureLoggedIn } from "connect-ensure-login"

var router = Router();

router.route("/invite/:id").get(ensureLoggedIn(), LinkController.getLink);

router.route("/invite").post(LinkController.createLink)

export default router; 