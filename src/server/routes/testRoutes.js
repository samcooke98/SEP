/* Routes for Testing only */
import { Router } from "express";
import mongoose from "mongoose";


/* Import Models */
import Account from "../models/account.js";
import invitationLink from "../models/invitationLinks.js";
import resetLink from "../models/resetLink.js";
import resource from "../models/resource.js";
import team from "../models/team.js";

import { sendError, sendPayload } from "../utils/apiResponse.js";

let router = new Router();

router.get("/test-reset", async (req, res) => {
    if (process.env.NODE_ENV != "production") {
        try {
            await Account.remove({});
            await invitationLink.remove({});
            await resetLink.remove({});
            await resource.remove({})
            await team.remove({});
            res.json(sendPayload("cleared"))
        } catch (err) {
            res.json(sendError(err))
        }
    }
})


export default router;