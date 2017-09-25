/**
 * Action Creators
 */

/* It's a good idea to use Standard Flux Actions */
// https://github.com/acdlite/flux-standard-action
// https://github.com/reduxactions/redux-actions

import { createAction } from "redux-actions";
import { post, get, del} from "../utils/api.js";
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

export const createComment = createAction(actionTypes.CREATE_COMMENT, async (resourceId, userId, comment) => {
    return post(`${resourceId}/comments`, {resourceId, userId, comment}).then(
        (payload) => normalize( normalizr.normalizeComment, payload) 
    )
})

export const getComments = createAction(actionTypes.GET_COMMENTS, async (resourceId) => {
    return get(`resource?comment=${resourceId}`).then( 
        (payload) => normalize( normalizr.normalizeComment, payload) 
    )
})

export const createResource = createAction(actionTypes.CREATE_RESOURCE, async (url, title, description, teamID) => {
    return post(`resource`, { url, title, description, team: teamID }).then(

        (payload) => normalize( normalizr.normalizeResource, payload) 
    )
})

export const getResources = createAction(actionTypes.GET_RESOURCE, async (teamID) => {
    return get(`resource?team=${teamID}`).then( 
        (payload) => normalize( normalizr.normalizeResources, payload) 
    )
})

export const deleteResource = createAction(actionTypes.DELETE_RESOURCE, async (resourceID) => {
    return del( `resource/${resourceID}`);
}, (resourceID) => ({ id: resourceID}) ) //Create a meta part, containing the resource that was deleted



//At some point, it could be cool to generate these at runtime? 
// const apiActions = [ 
//     {
//         endpoint: "login", 
//         actionString: "LOGIN", 
//         params: [ { }]

//     }
// ]

