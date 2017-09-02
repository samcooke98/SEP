/**
 * Reducers
 */
import * as actions from "./actionTypes.js"

const initialState = {
    loggedIn: false,
    registrationSuccess: null
}

//Do not mutate the state! 

export default function reducer (state = initialState, action) {
    console.log(action);

    switch (action.type) {
        case 'LOGIN':
            console.log(action)
            return Object.assign( {}, state, { loggedIn: action.payload.success });
        case 'REGISTER': 
            return Object.assign( {}, state, { })
        case 'GET_USER':
            console.log(action);
            return Object.assign( {}, state, { userDetails: action.payload} );
        case 'GET_INVITE': 
            console.log(action.payload);
            
            return Object.assign( {}, state, { teams: action.payload.payload.team})
        default:
            console.log("unhandled redux action");
            return state;
    }
}



/**
 * If you want to use modules, uncomment the following
 */
/*
import {combineReducers} from "redux";

import reducer from "./modules/${module}/Reducer.js";

export default combineReducers({ 
    reducer
});
*/
