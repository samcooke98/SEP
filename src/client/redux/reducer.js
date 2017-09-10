/**
 * Reducers
 */
import { handleAction } from "redux-actions"

const initialState = {
    loggedIn: false,
    registrationSuccess: null,

    resources: {},
    ui: {}
}

//Do not mutate the state! 

export default function reducer(state = initialState, action) {
    console.log(action);

    switch (action.type) {
        case 'LOGIN':
            console.log(action)
            return Object.assign({}, state, { loggedIn: action.payload.success });
        case 'REGISTER':
            return Object.assign({}, state, {})
        case 'GET_USER':
            console.log(action);
            return Object.assign({}, state, { userDetails: action.payload });
        case 'GET_INVITE':
            console.log(action.payload);
            return Object.assign({}, state, { teams: action.payload.payload.team })
        case "CREATE_RESOURCE":
            console.log(action);
            if (action.payload.success) {
                console.log({ resources: action.payload.payload.entities.resources });

                return Object.assign({}, state, { resources: action.payload.payload.entities.resources })

            } else
                return Object.assign({}, state, { ui: { resources: action.payload.result } })
        case "GET_RESOURCE":
            return Object.assign({}, state, {

            })
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

/*
Moving forward a more efficient redux state may look like: 
const initialState = {
    data: { 
        users: {},
        resources: {},
        teams: {},
    },
    misc: { 
        loggedIn: false,
    },
    ui: { 
        registrationSuccess: null,   
    }
}
*/