import Link from "../models/invitationLinks.js";
import cuid from "cuid";
import moment from "moment";
/**
 * Returns an error if the 
 * @param {Express Request Object} req 
 * @param {Express Response Object} res 
 */
export function getLink(req, res) {
    console.log("Here Line 10");
    let id = req.params.id; //The req must have an ID 
    Link.findOne({ urlID: id }).exec((err, link) => {
        if (err) {
            console.warn("An error occured when a user tried to join");
            console.warn("-- Request Object follows --");
            console.warn(req);
            console.warn("-- Error Follows --");
            console.warn(err);
        } else { 
            if (link.checkValidity()) { 
                //Return a success view
                console.log("IS VALID");
                res.send("It worked");
            } else { 
                console.log("IS EXPIRED");
                res.send("Expired Link!");
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