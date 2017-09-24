
require('es6-promise').polyfill();
require('fetch-everywhere');

const API_URL = "http://localhost:3000/api/"

const formEncode = (params) => Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');

/**
 * Makes a post request 
 * @param {*} endpoint 
 * @param {Object} params 
 * @returns {Object}
 */
export async function post(endpoint, params) {
    console.log(params);
    var opts = {
        method: "POST",
        headers: {
            //Eh, we can just use JSON for now really. Server handles it fine. 
            //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        //If we want to encode as www-form use formEncode 
        body: JSON.stringify(params)
    }
    return fetch(API_URL + endpoint, opts).then((response) => {
        if (response.status == 401) {
            return { success: false, msg: "Server returned unauthorised" }
        }
        return response.json()
    })
}

export async function get(endpoint) {
    console.log(API_URL + endpoint);
    return fetch(API_URL + endpoint, {
        method: "GET",
        credentials: "same-origin"
    }).then((response) => {
        if (response.status == 401) {
            return { success: false, msg: "Server returned unauthorised" }
        }
        try {
            return response.json()
        } catch (err) {
            console.warn('error when parsing json');
        }
    })
}

export async function del(endpoint) {
    return fetch(API_URL + endpoint, {
        method: "DELETE",
        credentials: "same-origin"
    }).then((response) => {
        if (response.status == 401) {
            return { success: false, msg: "Server returned unauthorised" }
        }
        try {
            return response.json()
        } catch (err) {
            console.warn('error when parsing json');
        }
    })
}
