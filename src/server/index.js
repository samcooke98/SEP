/* 
Server Entry Point. 
Changes made in this file, will require a reload. 
Changes made in files included by this, however, shouldn't
*/
//General
import http from "http";
import express from 'express';
import React from "react"


import passport from "passport";
import Account from "./models/account.js";
import bodyParser from 'body-parser';

//React Hot Reloading Stuff
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
const config = require('../../webpack/client.dev.js')
import webpack from 'webpack';


//Initialisation 
const app = express();

//Setup Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

/* Setup Account Logging-in */
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(require('express-session')({
    secret: 'sakfofjeoiafjeo',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const compiler = webpack(config);

const isProd = (process.env.NODE_ENV == "production")

if (!isProd) {
    /**  Serve the webpack bundle to the client */
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true, publicPath: config.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
}


//https://github.com/webpack/webpack-dev-middleware#server-side-rendering to investigate 
import App from "./app.js"
/** API Routes, and the such */
app.use(function main(req, res, next) {
    return App(req, res, next);
})
let currentApp = App;

if (module.hot) {
    console.log("HMR Enabled");
    module.hot.accept('./app.js', function () {
        for (let layer of app._router.stack) {
            if (layer.name == "main") {
                const newApp = require("./app.js").default;
                //.default becuz we are using the es6 modules. 
                //Overwrite the layer function
                layer.handle = function main(req, res, next) {
                    return newApp(req, res, next);
                }
                console.log("HMR: Updated");
            }
        }
    })
    module.hot.decline("./index.js");
}

const server = http.createServer(app)
server.listen(process.env.PORT || 3000, "0.0.0.0", (err) => {
    if (err)
        throw err;

    const addr = server.address();
    console.log("Server started");
    console.log("Listening on http://%s:%d", addr.address, addr.port);
});


