/**
 * Action Creators
 */

/* It's a good idea to use Standard Flux Actions */ 
// https://github.com/acdlite/flux-standard-action
// https://github.com/reduxactions/redux-actions

import {createAction } from "redux-actions";
import { post, get } from "../utils/api.js";

import * as types from "./actionTypes.js";

function creator( param ) { 
    return { 
        type: types.TYPE_STR,
        payload: param
    }
}

//By naming the parameters after what the server expects, we can use shorthand syntax for object creation 
export const login = createAction("LOGIN", async (username, password) => { 
    return post("login", {username, password})
} )


export const register = createAction("REGISTER", async (username, password, firstName, lastName, teamName, description, category) => { 
    return post("register", { username, password, firstName, lastName,teamName, description, category})
})

export const getUserDetails = createAction("GET_USER", async ()=> { 
    return get("user")
})

export const sendInvitations = createAction("SEND_INVITES", async (id, emails) => { 
     return post("invite", {id, emails})
})

export const getInviteInfo = createAction("GET_INVITE", async (id) => { 
    return get(`invite/${id}`)
//todo: normalize and store data as it possibly returns a team info
})

export const joinTeam = createAction("JOIN_TEAM", async(username, firstName, lastName, password, teamID) => { 
    return post(`invite/${teamID}`, {username, firstName, lastName, password})
})

export const resetPass = createAction("RESET_PASS", async (username) => { 
    return post(`reset`, {username})
})

export const resetPassConfirm = createAction("RESET_PASS_CONFIRM", async(password, RID) => { 
    return post(`reset/confirmAction`, {RID, password})
})

//At some point, it could be cool to generate these at runtime? 
// const apiActions = [ 
//     {
//         endpoint: "login", 
//         actionString: "LOGIN", 
//         params: [ { }]

//     }
// ]

