/* 
    Root Component 
*/

import React from "react";
import { Provider } from "react-redux";
import { Switch } from "react-router-dom";
import {Helmet} from "react-helmet";
    
import { routes, RouteWithSubRoutes } from './routes';


export default function App(props) {
    console.log(routes);
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Reloaded</title> 
            </Helmet> 
            Hot reloading ss
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))
                }
            </Switch>
        </div>

                )
}

