require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from "path";

import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import React from "react";

import App from "../client/App.js";

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../client/redux/reducer.js'

import { Helmet } from "react-helmet";
var manifest;
try { 
    manifest = (require('./static/manifest.json'));     
} catch (err) { 
    manifest = {};
    if(process.env.NODE_ENV === "production")  //Can't continue because we need 
        throw err;
}

mongoose.connect(process.env.MONGO_URL,{}, (err) => { 
    if(err) console.log(err); else console.log("Connected to Mongo");
});
mongoose.Promise = global.Promise;


const app = express();

//Enable Hot reloading
if (process.env.NODE_ENV !== "production") {
    var webpack = require('webpack');
    var webpackConfig = require('../../webpack.config.dev.js');
    var compiler = webpack(webpackConfig);

    console.log("Enabling hot reloading")

    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));
    app.use(require("webpack-hot-middleware")(compiler));   
}

app.get('/ping', (req, res) => {
    res.send("Hello World!");
})
//Setup static files 
app.use(express.static(path.join(__dirname, 'static')))


//Import API routes
import EgRouter from "./routes/post.eg.js";

app.use('/api', EgRouter)



//Only SSR when in production (for now)
app.use((req, res, next) => {
    if(process.env.NODE_ENV == "production") {
        const context = {};

        const store = createStore(reducer);
        const preloadedState = store.getState();
    
        let html = ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
                <Provider store={store}>
                    <App />
                </Provider>
            </StaticRouter>
        )
        const helmet = Helmet.renderStatic();
        res.send(generateHTML(html, preloadedState, helmet));
        
    } else {
        const helmet = Helmet.renderStatic();
        
        res.send(generateHTML('', {}, helmet));
    }
})

export default app;



//We should also work on code-splitting 
//We should also work on chunking (esp. production) 


const generateHTML = (reactDOM, preloadedState, helmet) => {
    return `<!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
    <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    </head>
    <body ${helmet.bodyAttributes.toString()}>
    <div id='root-app'>${reactDOM}</div>
    <script src="${(process.env.NODE_ENV ==="production") ? manifest['main.js'] :"/client.bundle.js"}"></script>
    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}</script>        
    </body>
    </html>`
}

//TODO SECURITY CONSIDERATIONS
// http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations