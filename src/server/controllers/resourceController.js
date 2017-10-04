import Resource from "../models/resource.js";
import { get } from "../controllers/TeamController.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";


//TODO: Team Relationship
export async function createResource(url, title, description, userID, teamID) {
    var newRes = new Resource({url: url, owner: userID, title, description, team: teamID});

    try {
        await newRes.save();
        if (newRes) {
            // var team = await get(teamID);
            // await team.addResource(newRes._id);
            return sendPayload(newRes);
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
        let res = await Resource.findOne({_id: resourceID});
        const result = await res.populate("comments").execPopulate();
        return sendPayload(result);

    } catch (err) {
        return sendPayload(err);
    }
}

export async function getFromTeam(teamID) {
    try {
        let result = [];
        let res = await Resource.find({team: teamID});
        for (var resource of res) {
            result.push(await resource.populate("comments").execPopulate());
        }

        return sendPayload(result);
    } catch (err) {
        return sendPayload(err);
    }
}

export async function remove(resourceID, userID) {
    //Check that the user is the creator
    try {
        let resource = await Resource.findOne({_id: resourceID});

        if (resource.owner.equals(userID)) {
            Resource.deleteOne({_id: resourceID}).exec();
            return sendPayload("Deleted")
        } else {
            let resource = await resource.populate('team').execPopulate();
            if (resource.team.owner.equals(userID)) {
                Resource.deleteOne({_id: resourceID}).exec();
                return sendPayload("Deleted");
            } else {
                return sendError("You don't have permission to do that!");
            }
        }
    } catch (err) {
        return sendError("Invalid Resource ID");
    }
}

/**
 * 
 * @param {CoommentObj} Comment 
 */
export async function addComment(commentId, resourceID) {
    try {
        let res = await Resource.findById(resourceID);
        res.comments.push(commentId);
        const success = await res.save();
        return success;
    } catch (err) {
        console.log(err);
    }
}

export async function deleteComment(resourceID, commentID, userID)
{
    try {
        let res = await Resource.findById(resourceID);
        if (res.owner.equals(userID)) {
            res.comments.pull(commentID);
        } else {
            let comment = res.comments.id(commentID);
            if (comment.userId.equals(userId))
            {
                res.comments.pull(commentID);
            }
        }
        const success = await res.save();
        return success;
    } catch (err) {
        console.log(err);
    }
}