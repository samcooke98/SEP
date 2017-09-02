/**
 * File to help with request management.
 * IE:
 *   Is user logged in? 
 *   Is user admin? 
 *   Is no user logged in? 
 */
import {sendError} from "./apiResponse.js"

export function isLoggedIn(req, res, next) { 
    console.log("Is logged in!");
    console.log(req.session);
    console.log(req.user);
    if(req.user == undefined) {
        //User isn't logged in
        res.json(sendError("This endpoint requires authentication"));
    } else { 
        next();
    }
}
