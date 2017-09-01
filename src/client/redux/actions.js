/**
 * Action Creators
 */

/* It's a good idea to use Standard Flux Actions */ 
// https://github.com/acdlite/flux-standard-action
// https://github.com/reduxactions/redux-actions

import * as types from "./actionTypes.js";

function creator( param ) { 
    return { 
        type: types.TYPE_STR,
        payload: param
    }
}