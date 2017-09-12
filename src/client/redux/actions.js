/**
 * Action Creators
 */

/* It's a good idea to use Standard Flux Actions */
// https://github.com/acdlite/flux-standard-action
// https://github.com/reduxactions/redux-actions

import { createAction } from "redux-actions";
import { post, get } from "../utils/api.js";
import * as normalizr from "../utils/normalizr";
import * as actionTypes from "./actionTypes.js";


//Helper function. Give it a method to normalize, and the data. It will normalize if it should, or return raw data otherwise. 
const normalize = (normalizeFunc, data) => data.success
    ? ({ payload: normalizeFunc(data.payload), success: data.success })
    : ({ payload: data.payload, success: data.success});


//By naming the parameters after what the server expects, we can use shorthand syntax for object creation 
export const login = createAction(actionTypes.LOGIN, async (username, password) => {
    return post("login", { username, password }).then( (val) => normalize( normalizr.normalizeUser, val))
})


export const register = createAction(actionTypes.REGISTER, async (username, password, firstName, lastName, teamName, description, category) => {
    return post("register", { username, password, firstName, lastName, teamName, description, category })
})

export const getUserDetails = createAction(actionTypes.GET_USER, async () => {
    return get("user").then( (val) => normalize(normalizr.normalizeUser, val ))
})

export const sendInvitations = createAction(actionTypes.SEND_INVITES, async (id, emails) => {
    return post("invite", { id, emails })
})

export const getInviteInfo = createAction(actionTypes.GET_INVITE, async (id) => {
    return get(`invite/${id}`).then((val) => normalize(normalizr.normalizeTeam, val))
    //todo: normalize and store data as it possibly returns a team info
})

export const joinTeam = createAction(actionTypes.JOIN_TEAM, async (username, firstName, lastName, password, teamID) => {
    return post(`invite/${teamID}`, { username, firstName, lastName, password }).then( (val) => normalize(normalizr.normalizeUser, val))
})

export const resetPass = createAction(actionTypes.RESET_PASS, async (username) => {
    return post(`reset`, { username })
})

export const resetPassConfirm = createAction(actionTypes.RESET_PASS_CONFIRM, async (password, RID) => {
    return post(`reset/confirmAction`, { RID, password })
})

export const comment = createAction(actionTypes.COMMENT, async (username, text, url) => {
    return post(`${url}/comments`, { username, text, url})
})

export const createResource = createAction(actionTypes.CREATE_RESOURCE, async (url, title, description, teamID) => {
    return post(`resource`, { url, title, description, team: teamID }).then(

        (payload) => normalize( normalizr.normalizeResource, payload) 
        //This helper function replaces all the code below!
        // {
        //     if (payload.success)
        //         return {
        //             : payload.success,
        //             payload: normalizr.normalizeResource(payload.payload)
        //         }
        //     else
        //         return {
        //             success: payload.success,
        //             payload: payload.payload
        //         }
        // }
    )
})



export const getResources = createAction(actionTypes.GET_RESOURCE, async (teamID) => {
    return get(`resource?team=${teamID}`).then( 
        (payload) => normalize( normalizr.normalizeResources, payload) 
    )
})



//At some point, it could be cool to generate these at runtime? 
// const apiActions = [ 
//     {
//         endpoint: "login", 
//         actionString: "LOGIN", 
//         params: [ { }]

//     }
// ]

