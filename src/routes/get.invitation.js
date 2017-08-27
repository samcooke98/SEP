// import Link from "../models/invitationLinks.js";
import * as LinkController from "../controllers/invitationLink.js";
import {Router } from "express";

var router = Router();

router.route("/invite/:id").get( LinkController.getLink ) 

router.route("/invite").post( LinkController.createLink )

export default router; 