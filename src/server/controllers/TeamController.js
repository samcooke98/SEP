import Team from "../models/team.js"


export async function get(id) { 
    return Team.findById(id);
}

export async function isOwner(userID, teamID) { 
    
}