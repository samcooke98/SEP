import Link from "../models/invitationLinks.js";
import User from "../models/account.js";
import cuid from "cuid";
import moment from "moment";
import passport from "passport";



/**
 * Returns an error if the 
 * @param {Express Request Object} req 
 * @param {Express Response Object} res 
 */
export function getLink(req, res) {
    console.log(req.user);
    let id = req.params.id; //The req must have an ID 
    Link.findOne({ urlID: id }).exec((err, link) => {
        if (err) {
            console.warn("An error occured when a user tried to join");
            console.warn("-- Request Object follows --");
            console.warn(req);
            console.warn("-- Error Follows --");
            console.warn(err);
        } else { 
            console.log(link);
            if(!link) 
                res.send("Invalid Link");
            else if (link.checkValidity()) {
                //Add user to team
                User.findById(req.user._id, (err,user) => {
                    console.log(user.teams.indexOf(link.teamID))
                    if(user.teams.indexOf(link.teamID) !== -1) {
                        //User can't join the same team twice
                        res.send("You've already joined this team");
                    } else {
                        user.teams.push(link.teamID);
                        user.save();                 
                        res.send("You joined the team");  
                    }
                }) 
            } else { 
                console.log("IS EXPIRED");
                res.render("error", {message: "Invalid Link!", error: { status: '', stack: '' }})
                //Notify that the link is now invalid has timed out
            }
        }
    })
}

export function postLink(res, req) { 
    //TODO: @Alex
    //Check if user is authed

    //Create new Link using createLink func below - time depends on time specified by 
    
}

/**
 * 
 * @param {Integer} time - The duration that the link should last in minutes
 * @param {*} teamID 
 */
export function createLink(time, teamID) {
    let link = new Link({
        urlID: cuid(), 
        teamID: teamID,
        expiryTime: moment().utc().add(time, "minutes")
    })

    console.log(link);
    link.save( (err) => console.log(err) ); 
}


/* Test functions */
// createLink(60, '59a2cf986691f112a8f95156')

//moment.utc("2017-08-27T14:21:09.104+00:00")