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
            misc: {
                ...state.misc,
                worked: true
            }
        }),
        onFail: (state, action) => ({

        })
    },
    [actionTypes.GET_RESOURCE]: {
        onSuccess: (state, action) => ({
            ui: {
                ...state.ui,
                result: action.payload.payload.result
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
            ui: { ...state.ui, getInviteMessage: "Something went wrong", getInviteSuccess:false, invitedID: ''}
        })
    },
    [actionTypes.JOIN_TEAM]: { 
        onSuccess: (state,action) => ({ui: { ...state.ui, joinTeam: true,joinTeamMsg: ''}, misc: { ...state.ui, loggedIn: true, userID: action.payload.payload.result }}),
        onFail:    (state,action) => ({ui: { ...state.ui, joinTeam: false, joinTeamMsg: action.payload}}),
    }


}

export default function rootReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case actionTypes.LOGIN:
            return loginReducer(state, action)
            break;
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
    console.log(action.payload);
    if (action.payload.success) {
        console.log('here');
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
