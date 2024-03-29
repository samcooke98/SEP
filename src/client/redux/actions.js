/**
 * Action Creators
 */

/* It's a good idea to use Standard Flux Actions */
// https://github.com/acdlite/flux-standard-action
// https://github.com/reduxactions/redux-actions

import { createAction } from "redux-actions";
import { post, get, del } from "../utils/api.js";
import * as normalizr from "../utils/normalizr";
import * as actionTypes from "./actionTypes.js";


//Helper function. Give it a method to normalize, and the data. It will normalize if it should, or return raw data otherwise. 
const normalize = (normalizeFunc, data) => data.success
    ? ({ payload: normalizeFunc(data.payload), success: data.success })
    : ({ payload: data.payload, success: data.success });


//By naming the parameters after what the server expects, we can use shorthand syntax for object creation 
export const login = createAction(actionTypes.LOGIN, async (username, password) => {
    return post("login", { username, password }).then((val) => normalize(normalizr.normalizeUser, val))
})

export const logout = createAction(actionTypes.LOGOUT, async () => {
    return get("logout")
})


export const register = createAction(actionTypes.REGISTER, async (username, password, firstName, lastName, teamName, description, category, avatar) => {
    return post("register", { username, password, firstName, lastName, teamName, description, category, avatar })
})

export const getUserDetails = createAction(actionTypes.GET_USER, async () => {
    return get("user").then((val) => normalize(normalizr.normalizeUser, val))
})




export const sendInvitations = createAction(actionTypes.SEND_INVITES, async (id, emails) => {
    return post("invite", { id, emails })
})


export const getInviteInfo = createAction(actionTypes.GET_INVITE, async (id) => {
    return get(`invite/${id}`).then((val) => normalize(normalizr.normalizeTeam, val))
    //todo: normalize and store data as it possibly returns a team info
})

export const joinTeam = createAction(actionTypes.JOIN_TEAM, async (username, firstName, lastName, password, teamID) => {
    return post(`invite/${teamID}`, { username, firstName, lastName, password }).then((val) => normalize(normalizr.normalizeUser, val))
})

export const resetPass = createAction(actionTypes.RESET_PASS, async (username) => {
    return post(`reset`, { username })
})

export const resetPassConfirm = createAction(actionTypes.RESET_PASS_CONFIRM, async (password, RID) => {
    return post(`reset/confirmAction`, { RID, password })
})

export const createComment = createAction(actionTypes.CREATE_COMMENT, async (resourceId, userId, comment, taggedUsers) => {
    return post(`${resourceId}/comments`, { resourceId, userId, comment, taggedUsers}).then(
        (payload) => normalize(normalizr.normalizeComment, payload)
    )
})

export const getComments = createAction(actionTypes.GET_COMMENTS, async (resourceId) => {
    return get(`resource/${resourceId}/comment`).then(
        (payload) => normalize(normalizr.normalizeComment, payload)
    )
})

export const deleteComment = createAction(actionTypes.DELETE_COMMENT, async (resourceId, commentId) => {
    return del( `resource/${resourceId}/comments/${commentId}`);
}, (resourceId,commentId) => ({ resourceId: resourceId, commentId:commentId}) ) //Create a meta part, containing the comment that was deleted


export const createResource = createAction(actionTypes.CREATE_RESOURCE, async (url, title, description, teamID, tags) => {
    return post(`resource`, { url, title, description, team: teamID, tags }).then(

        (payload) => normalize(normalizr.normalizeResource, payload)
    )
}, (url,tititle,description, teamID, tags) => ({teamID}) )

export const updateDetails = createAction(actionTypes.UPDATE_DETAILS, async (email, newPassword, firstName, lastName, avatar) => {
    return post('updateDetails', { email, newPassword, firstName, lastName, URI:avatar }).then((val) => normalize(normalizr.normalizeUser, val))
})

export const getResource = createAction(actionTypes.GET_RESOURCE, async (resId) =>
    get(`resource/${resId}`).then((payload) => normalize(normalizr.normalizeResource, payload))
)

export const getResources = createAction(actionTypes.GET_RESOURCES, async (teamID) => {
    return get(`resource?team=${teamID}`).then(
        (payload) => normalize(normalizr.normalizeResources, payload)
    )
}, (teamID) => ({ teamID }))

export const deleteResource = createAction(actionTypes.DELETE_RESOURCE, async (resourceID) => {
    return del(`resource/${resourceID}`);
}, (resourceID) => ({ id: resourceID })) //Create a meta part, containing the resource that was deleted

export const getUsers = createAction(actionTypes.GET_USERS, async (teamID) => {
    return get(`team/${teamID}/users`).then(
        (payload) => normalize(normalizr.normalizeUsers, payload)
    )
}, (teamID) => ({ teamID }))

export const removeUserFromTeam = createAction(actionTypes.REMOVE_USER_FROM_TEAM, async (userID, teamID) => {
    return del(`team/${teamID}/users/${userID}`).then((payload) => normalize(normalizr.normalizeTeam, payload))
}, (userID, teamID) => ({ userID, teamID }))

export const getUserById = createAction(actionTypes.GET_USER_BY_ID, async (userID) => {
    return get(`user/${userID}`).then(val => normalize(normalizr.normalizeUser, val))
})

export const leaveTeam = createAction(actionTypes.LEAVE_TEAM, async (teamID) => del(`user/teams/${teamID}`).then((val) => normalize(normalizr.normalizeUser, val)))

export const createTeam = createAction(actionTypes.CREATE_TEAM, async (name, description) => post(`team`, { name, description }).then((val) => normalize(normalizr.normalizeTeam, val)))
//At some point, it could be cool to generate these at runtime? 
// const apiActions = [ 
//     {
//         endpoint: "login", 
//         actionString: "LOGIN", 
//         params: [ { }]

//     }
// ]

