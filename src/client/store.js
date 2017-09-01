/**
 * Main Store Function 
 */

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./redux/reducer.js";
//TODO: Redux Dev Tools 

export function configureStore( initialState = {}) { 
    const enhancers = [
        applyMiddleware(thunk)
    ];

    const store = createStore(
        reducer, 
        initialState, 
        compose(...enhancers)
    );
    //TODO: Hotloading 
    return store; 
}