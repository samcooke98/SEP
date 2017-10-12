import { routes as clientRoutes } from "../../client/Routes.js"
import { matchPath } from 'react-router-dom'

export default async function serverRender(req, res, next) {
    const matches = recursive(req.url, clientRoutes);
    if (matches) {

        try {
            res.send( await renderApp(req.url, req));
        }
        catch (err) {
            console.log("error output============");
            console.log(err);
            next(err);
        }
       
    } else {
        next();
    }
}

const recursive = (url, routes) => {
    return routes.some((route) => {
        const match = matchPath(url, route);
        if (route.routes && match) {
            return recursive(url, route.routes);
        } else {
            return match;
        }
    })
}
import React from "react";
import { StaticRouter } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../../client/redux/reducer.js'
import { Helmet } from "react-helmet";
var userController = require('../controllers/UserController.js')

const renderApp = async (location, req) => {
    const store = createStore(reducer);

    const css = new Set();

    const context = {};
    if (req.user) {
        let userDetails = await userController.getDetails(req.user._id);

        let teamObj = {};
        let userObj = Object.assign({}, userDetails._doc, { teams: [] } )
        for (var team of userDetails.teams) {
            teamObj[team._id] = team;
            userObj.teams.push(team._id);
        }

        store.dispatch({
            type: "LOGIN",
            payload: {
                success: true, payload: {
                    result: req.user._id,
                    entities: {
                        users: { [req.user._id]: userObj },
                        teams: teamObj
                    }
                }
            }
        })
    }

    var App = require('../../client/App.js').default;

    const preloadedState = store.getState();    
    let html = ReactDOMServer.renderToString(
        <StaticRouter location={location} context={context}>
            <Provider store={store}>
                <App />
            </Provider>
        </StaticRouter>
    )
    const helmet = Helmet.renderStatic();
    return (generateHTML(html, preloadedState, helmet))

}
let manifest;
//This gets the name of the client bundle. TODO: In the future, we should also get the vendor bundle. s
if (process.env.NODE_ENV == "production") {
    manifest = __non_webpack_require__('./static/build-manifest.json');
}

/**
 * 
 * @param {*} reactDOM 
 * @param {*} preloadedState 
 * @param {*} helmet 
 */
const generateHTML = (reactDOM, preloadedState, helmet) => {
    return `<!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
    <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    <link rel="manifest" href="/manifest.json">
    <link rel="stylesheet" type='text/css' href='/styles.css'>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <style>html, body{margin:0;padding:0;}</style>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    </head>
    <body ${helmet.bodyAttributes.toString()}>
    <div id='root-app'>${reactDOM}</div>
    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}</script>            
    <script src="${(process.env.NODE_ENV === "production") ? '/' + manifest['main.js'] : "/client.bundle.js"}"></script>
    </body>
    </html>`
}




/* 
We need to use something to prevent the Flash of Unstyled content when loading ( )
https://github.com/css-modules/postcss-modules
https://github.com/kriasoft/isomorphic-style-loader



This also looks cool? 
https://github.com/javivelasco/react-css-themr

*/