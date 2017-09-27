import { routes as clientRoutes } from "../../client/Routes.js"
import { matchPath } from 'react-router-dom'

export default function serverRender(req, res, next) {
    const matches = recursive(req.url, clientRoutes);
    if (matches) {
        res.send(renderApp(req.url));
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

const renderApp = (location) => {
    const store = createStore(reducer);

    const preloadedState = store.getState();
    const css = new Set();

    const context = {
        insertCss: (...styles) => {
            styles.forEach(style => css.add(style._getCss()));
        },
    };


    var App = require('../../client/App.js').default;

    //TODO: We also want to check if the router matches, cause if it doesn't we should return 404

    let html = ReactDOMServer.renderToString(
        <StaticRouter location={location} context={context}>
            <Provider store={store}>
                <App />
            </Provider>
        </StaticRouter>
    )
    console.log(css);

    console.log("^^^");
    console.log(context);
    const helmet = Helmet.renderStatic();
    return (generateHTML(html, preloadedState, helmet))

}

// if (process.env.NODE_ENV == "production") {
    const manifest = require('./static/manifest.json');
// }

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
    <link rel="stylesheet" type='text/css' href='styles.css'>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <style>html, body{margin:0;padding:0;}</style>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    </head>
    <body ${helmet.bodyAttributes.toString()}>
    <div id='root-app'>${reactDOM}</div>
    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}</script>            
    <script src="${(process.env.NODE_ENV === "production") ? manifest['main.js'] : "/client.bundle.js"}"></script>
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