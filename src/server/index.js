import http from "http"
import app from "./server.js";

const server = http.createServer(app);
let currentApp = app;
server.listen(process.env.PORT || 3000); 


//HMR is currently disabled on the server.  
//(What happens is the server restarts, while the react hot loader tries to connect - this creates an error, which prevents the client HMR to continue running); 
//(It's probably possible to do just requires some re-work (the module that is replaced can't include any client stuff) 
if(module.hot) { 
    module.hot.accept('./server.js', () => { 
        const app = require('./server.js').default;
        console.log("Reload");
        server.removeListener("request", currentApp);
        server.on("request", app); 
        currentApp = app;
    })

}
