// require('dotenv').config();
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import path from "path";

// import ReactDOMServer from "react-dom/server";
// import { StaticRouter } from "react-router-dom";
// import React from "react";
// // import App from "../client/App.js";
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
// import reducer from '../client/redux/reducer.js'
// import { Helmet } from "react-helmet";

// var manifest;
// //We're trying to load the manifest file
// //TODO: There is better ways to handle this 
// try {
//     manifest = (require('./static/manifest.json'));
// } catch (err) {
//     manifest = {};
//     if (process.env.NODE_ENV === "production")  //Can't continue because we need 
//         throw err;
// }

// //Mongoose setup
// mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/boilerplate", {}, (err) => {
//     if (err) console.log(err); else console.log("Connected to Mongo");
// });
// mongoose.Promise = global.Promise;



// const app = express();

// console.log(process.env.NODE_ENV)
// console.log(process.env.NODE_ENV !== "production")
// //Enable Hot reloading
// if (process.env.NODE_ENV !== "production") {
//     console.log("HERE!");
//     var webpack = require('webpack');
//     var webpackConfig = require('../../webpack.config.dev.js');
//     var compiler = webpack(webpackConfig);

//     console.log("Enabling hot reloading")

//     app.use(require("webpack-dev-middleware")(compiler, {
//         noInfo: true, publicPath: webpackConfig.output.publicPath
//     }));
//     app.use(require("webpack-hot-middleware")(compiler));
// }

// //Setup Body Parser
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json());


// //Setup passport
// var Account = require('./models/account');
// import passport from "passport";
// var LocalStrategy = require('passport-local').Strategy;
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

// app.use(require('express-session')({
//     secret: 'sakfofjeoiafjeo',
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());


// //Setup static files 
// app.use(express.static(path.join(__dirname, '../static')))
// console.log("BELOW")
// console.log(path.join(__dirname, '../static'))

// //Import API routes
// // import EgRouter from "./routes/post.eg.js";
// //TODO: Dynamic 
// // import {UserManagementRoutes, InvitationRoutes } from "./routes";
// import * as Routes from "./routes";

// for (var route in Routes) {
//     app.use('/api', Routes[route]);
// }

// var userController = require('./controllers/UserController.js')
// //Only SSR when in production (for now)
// app.use(async (req, res, next) => {
//     const store = createStore(reducer);

//     //If the user is authenticated, tell the redux state that is the case
//     if (req.user) {
//         console.log("User is logged in");
//         let userDetails = await userController.getDetails(req.user._id);
//         let teamObj = {};
//         let userObj = {};
//         for (var team of userDetails.teams) {
//             teayarbnmObj[team._id] = team
//         }
//         // Get the user (This looks ugly af sorry, but basically it is the result of a login operation)
//         store.dispatch({
//             type: "LOGIN",
//             payload: {
//                 success: true, payload: {
//                     result: req.user._id,
//                     entities: {
//                         users: { [req.user._id]: req.user },
//                         teams: teamObj
//                     }
//                 }
//             }
//         })
//     }

//     const preloadedState = store.getState();


//     if (process.env.NODE_ENV == "production") {
//         const context = {};

//         var App = require('../client/App.js');

//         //TODO: We also want to check if the router matches, cause if it doesn't we should return 404

//         let html = ReactDOMServer.renderToString(
//             <StaticRouter location={req.url} context={context}>
//                 <Provider store={store}>
//                     <App />
//                 </Provider>
//             </StaticRouter>
//         )
//         const helmet = Helmet.renderStatic();
//         res.send(generateHTML(html, preloadedState, helmet));

//     } else {
//         const helmet = Helmet.renderStatic();

//         res.send(generateHTML('', preloadedState, helmet));
//     }
// })

// export default app;



// //We should also work on code-splitting 
// //We should also work on chunking (esp. production) 


// const generateHTML = (reactDOM, preloadedState, helmet) => {
//     return `<!doctype html>
//     <html ${helmet.htmlAttributes.toString()}>
//     <head>
//     ${helmet.title.toString()}
//     ${helmet.meta.toString()}
//     ${helmet.link.toString()}
//     <link rel="manifest" href="/manifest.json">
    
//     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
//       rel="stylesheet">
//     <style>html, body{margin:0;padding:0;}</style>
//     <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
//     </head>
//     <body ${helmet.bodyAttributes.toString()}>
//     <div id='root-app'>${reactDOM}</div>
//     <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}</script>            
//     <script src="${(process.env.NODE_ENV === "production") ? manifest['main.js'] : "/client.bundle.js"}"></script>
//     </body>
//     </html>`
// }

// //TODO SECURITY CONSIDERATIONS
// // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations