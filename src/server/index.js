/* 
Server Entry Point. 
Changes made in this file, will require a reload. 
Changes made in files included by this, however, shouldn't
*/
//General
import http from "http";
import express from 'express';
import React from "react"

//Server-side Rendering 
import chokidar from "chokidar";

//React Hot Reloading Stuff
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
const config = require('../../webpack/client.dev.js')
import webpack from 'webpack';

//React SSR Stuff
import { matchPath } from 'react-router-dom'

//Initialisation 
const app = express();
const compiler = webpack(config);

/**  Serve the webpack bundle to the client */
app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
//https://github.com/webpack/webpack-dev-middleware#server-side-rendering to investigate 


/** API Routes, and the such */
app.use((req, res, next) => {
    require('./app.js')(req, res, next);
})

/** Watch for Changes in the Server files */
const watcher = chokidar.watch('./src/server');

//THIS doesn't work because of Webpack bundling... 
watcher.on('ready', function () {
    watcher.on('all', function () {
        console.log("Clearing /server/ module cache from server");
        console.log(require.cache);
        Object.keys(require.cache).forEach(function (id) {
            //We can't reload any Mongo Models (currently)
            //https://stackoverflow.com/questions/19643126/how-do-you-remove-a-model-from-mongoose
            if (/[\/\\]server[\/\\]/.test(id)) {
                if (/[\/\\]models[\/\\]/.test(id)) {
                    // console.log("Skipping reloading model")
                    // console.log(id);
                } else {
                    console.log(require.cache[id]);
                    delete require.cache[id];
                }
            }
        });
    });
});


//Server Rendering 
// import {routes as clientRoutes} from "../client/Routes.js"

// app.use((req, res, next) => {
//     //Imitate Switch with 'some'
//     //Note: This currently doesn't support nested routes 
//     clientRoutes.some((route) => {
//         if(route.routes){ 
//             //Recursive
//         }
//         const match = matchPath(req.url, route);
//         console.log(route);
//         console.log("Match ^^")
//         console.log(req.url);
//         if (match) {
//             res.send("Found match");
//             console.log(route);
//             return;
//         }
//     })
//     next();
// })




const server = http.createServer(app)
server.listen(process.env.PORT || 3000, 'localhost', (err) => {
    if (err)
        throw err;

    const addr = server.address();

    console.log("Listening on http://%s:%d", addr.address, addr.port);
});


