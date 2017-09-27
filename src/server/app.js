import express from 'express';
import * as Routes from "./routes";
import serverRenderer from "./utils/serverRender.js";
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
app.use( (req, res, next) => {
    return serverRenderer(req, res, next);
})

app.use(express.static(path.join(__dirname, 'static')))

app.get("/hello", (req,res) => res.send("Testing reloading") ) 

export default app;
// module.exports = app;  