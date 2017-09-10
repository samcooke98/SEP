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

/**
 * Function to help tell if a user is authorised to make an action against a team
 * If the user isn't able to - returns a JSON error object, and sends it.
 * If the user is able to, it calls the next function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export function canDo(req,res,next) { 
    let teamID = req.body.team; 
    let user = req.user;
    //Because the team IDs are Buffers, we compare with =='
    for(var team of user.teams) { 
        if(team == teamID){
            next();
            return;
        }
    }
    res.json(sendError("You aren't a member of this team"));    
} //TODO: This should have unit testing \ acceptance testing 


