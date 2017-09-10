import Resource from "../models/resource.js";
import { get } from "../controllers/TeamController.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";


//TODO: Team Relationship
export async function createResource(url, title, description, userID, teamID) {
    var newRes = new Resource({ url: url, owner: userID, title, description, team: teamID });

    try {
        await newRes.save();
        if (newRes) {
            // var team = await get(teamID);
            // await team.addResource(newRes._id);
            return sendPayload("Success");
        }
    } catch (err) {
        console.log(err);
        return sendError(err);
    }

}

/**
 * Function for REST GET of /resource/$ID 
 */
export async function getID(resourceID) {
    try {
        let res = await Resource.findById(resourceID);
        console.log(res);
        return sendPayload(res);

    } catch (err) { 
        return sendPayload(err);
    }
}