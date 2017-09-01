/**
 * Reducers
 */
import * as actions from "./actionTypes.js"

const initialState = {

}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case actions.TYPE:
            return state;
        default:
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
