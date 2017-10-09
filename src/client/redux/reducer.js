/**
 * Reducers
 */
import { handleAction, handleActions } from "redux-actions"
import combineReducers from "redux"
import * as actionTypes from "./actionTypes.js";
import merge from "lodash/merge";

const initialState = {
    data: { //Entities are placed in here 
        users: {},
        teams: {},
        resources: {},
        comments: {}
    },
    ui: {}, //UI Data is placed here -> Like error messages for example
    misc: { // Anything that doesn't fit above can go here, (or in a new node if you want ) 
        loggedIn: false,

    },

}

/**
 * So this array maps action types to a onSuccess and onFail function. 
 * Entity Normalisation happens regardless, if there is an entity on the payload
 */
var functionalReducers = {
    [actionTypes.CREATE_RESOURCE]: {
        onSuccess: (state, action) => ({
            ...state,
            misc: {
                ...state.misc,
                worked: true
            },
            ui: {
                ...state.ui,
                resource: [...(state.ui && state.ui.resource || []), action.payload.payload.result]
                // ^ Kinda complicated but basically either expands the array or creates a blank one, then merges the result in
            },
        }),
        onFail: (state, action) => ({

        })
    },
    [actionTypes.CREATE_COMMENT]: {
        onSuccess: (state, action) => ({
            misc: {
                ...state.misc,
                worked: true
            },
            ui: {
                ...state.ui,
                comments: [...(state.ui && state.ui.comments || []), action.payload.payload.result],
                // ^ Kinda complicated but basically either expands the array or creates a blank one, then merges the result in
            }
        }),
        onFail: (state, action) => ({

        })
    },
    [actionTypes.GET_COMMENTS]: {
        onSuccess: (state, action) => ({
            ui: {
                ...state.ui,
                comments: [...(state.ui && state.ui.comments || []), ...action.payload.payload.result]
                // ^ Kinda complicated but basically either expands the array or creates a blank one, then merges the result in
            }
        }),
        onFail: (state, action) => ({

        })
    },
    [actionTypes.LOGOUT]: {
        onSuccess: (state, action) => ({
            ...state,
            misc: {
                ...state.misc,
                loggedIn: false,
                userID: undefined
            }
        })
    },
    [actionTypes.GET_RESOURCES]: {
        onSuccess: (state, action) => ({
            ui: {
                ...state.ui,
                resource: [...(state.ui && state.ui.resource || []), ...action.payload.payload.result],
                // ^ Kinda complicated but basically either expands the array or creates a blank one, then merges the result in
            },
            data: {
                ...state.data,
                teams: {
                    ...state.data.teams,
                    [action.meta.teamID]: {
                        ...state.data.teams[action.meta.teamID],
                        resources: [
                            ...(state.data.teams[action.meta.teamID] || []),
                            ...action.payload.payload.result
                        ] //Store the resourceIDs into the team that the reqeuest was for
                    }
                }
            }
        }),
        onFail: (state, action) => ({

        })
    },
    [actionTypes.REGISTER]: {
        onSuccess: (state, action) => ({ //Success returns the same as login 
            ui: {
                ...state.ui,
                registrationSuccess: true,
                registrationFail: ""
            }
        }),
        onFail: (state, action) => ({
            ui: {
                ...state.ui,
                registrationFail: action.payload.payload,
                registrationSuccess: false,
            }
        }),
    },
    // [actionTypes.RESET_PASS]: {  (this doesn't need to be stored in Redux, as far as I can see )
    //     onSuccess: (state,action) => ({ ui: { ...state.ui, resetPassSent: true, resetPassError: ''}}),
    //     onFail: (state, action) => ({ui: {...state.ui, resetPassError: action.payload.payload, resetPassSent: false}})
    // },
    [actionTypes.GET_INVITE]: {
        onSuccess: (state, action) => ({
            ui: {
                ...state.ui, getInviteSuccess: true, getInviteMessage: '', invitedID: action.payload.payload.result
            },
        }),
        onFail: (state, action) => ({
            ui: { ...state.ui, getInviteMessage: "Something went wrong", getInviteSuccess: false, invitedID: '' }
        })
    },
    [actionTypes.JOIN_TEAM]: {
        onSuccess: (state, action) => ({ ui: { ...state.ui, joinTeam: true, joinTeamMsg: '' }, misc: { ...state.ui, loggedIn: true, userID: action.payload.payload.result } }),
        onFail: (state, action) => ({ ui: { ...state.ui, joinTeam: false, joinTeamMsg: action.payload } }),
    },
    [actionTypes.DELETE_RESOURCE]: {
        onSuccess: (state, action) => ({
            data: { ...state.data, resources: { ...state.data.resources, [action.meta.id]: {} } }, //Remove the data object (or set it to blank)
            ui: { ...state.ui, resources: state.ui.resources.filter((val) => val != action.meta.id) } //Remove the id from the resources array
        }), //Remove all instances of the id 
        onFail: (state, action) => ({})
    },
    [actionTypes.SEND_INVITES]: {
        onSuccess: (state, action) => ({ ...state, ui: { ...state.ui, inviteSuccess: true, inviteMsg: '' } }),
        onFail: (state, action) => ({ ...state, ui: { ...state.ui, inviteSuccess: false, inviteMsg: action.payload.error } })
    },
    [actionTypes.REMOVE_USER_FROM_TEAM]: {
        onSuccess: (state, action) => ({
            ...state, data: {
                ...state.data,
                users: {
                    ...state.data.users,
                    [action.meta.userID]: {
                        ...state.data.users[action.meta.userID],
                        teams: state.data.users[action.meta.userID].teams.filter( (id) => id != action.meta.teamID) 
                    }
                },
                teams: {
                    ...state.data.teams,
                    ...action.payload.payload.entities.teams
                }
            }
        })
    }


}

export default function rootReducer(state = initialState, action) {
    console.log(action);
    console.log("^^^ ACTINO ^^^ ");
    switch (action.type) {
        case actionTypes.LOGIN:
            return loginReducer(state, action)
            break;
        case actionTypes.CLEAR_INVITE_SUCCESS:
            return { ...state, ui: { ...state.ui, inviteSuccess: null, inviteMsg: '' } }
        default:
            if (action.payload && action.payload.payload && action.payload.payload.entities)
                state = merge({}, state, { data: action.payload.payload.entities })
    }
    if (functionalReducers[action.type]) {
        state = createReducer(state, action, functionalReducers[action.type].onSuccess, functionalReducers[action.type].onFail);
    } else {
        console.log("unhandled redux action");
        console.log(action);
    }
    return state;
}




const createReducer = (state, action, onSuccess, onFail) =>
    action.payload.success
        ? { ...state, ...mergeEntities(state, action), ...onSuccess(state, action) /* Add other properties here */ }
        : { ...state, ...onFail(state, action) } //Error Handling



//Login is special, it actually raises the correct error 
const loginReducer = (state, action) => {
    let payload = action.payload.payload;
    if (action.payload.success) {
        return { //ORDER is important. The spread operator does a shallow merge BUT it will overwrite. So call it first
            ...state,
            data: merge({}, state.data, payload.entities),
            misc: { ...state.misc, loggedIn: true, userID: payload.result },
        }
    } else {
        return {
            ...state,
            ui: { loginMsg: "Incorrect username or password" }

        }
    }
}

/**
 * Shortcut method to merge entities, returns a new object. 
 * @param {*} state 
 * @param {*} action 
 */
const mergeEntities = (state, action) =>
    (action.payload && action.payload.payload && action.payload.payload.entities)
        ? merge({}, state, { data: action.payload.payload.entities })
        : state
