require('dotenv').config();
import express from 'express';
import * as Routes from "./routes";
import serverRenderer from "./utils/serverRender.js";
import mongoose from "mongoose";
import passport from "passport";
import Account from "./models/account.js";
import bodyParser from 'body-parser';

const path = require('path')// __non_webpack_require__('path');

const app = express();

//Add the Routes from the ./routes/index.js to the App's middleware.
//TODO: Investigate Webpack unravelling this for us? 
for (var route in Routes) {
    app.use('/api', Routes[route]);
}

//You don't have to do this dynamically, you may prefer to do it like: 
// import resourceRoutes from "./resourceRoutes.js"
//app.use("/api", resourceRoutes);

//Handle React Stuff 
app.use(  serverRenderer )

//Send Bundle
app.use(express.static(path.join(__dirname, 'static')))
//Send Static from the Build directory 
app.use(express.static(path.join(__dirname, "../static")))


/* Setup Mongo Connection */
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/boilerplate", {
    useMongoClient: true
}, (err) => {
    if (err) console.log(err); else console.log("Connected to Mongo");
});
mongoose.Promise = global.Promise


export default app;
// module.exports = app;  