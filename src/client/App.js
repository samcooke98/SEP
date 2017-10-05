/* 
    Root Component 
*/

import React from "react";
import { Provider } from "react-redux";
import { Switch } from "react-router-dom";
import {Helmet} from "react-helmet";
    
import { routes, RouteWithSubRoutes } from './Routes';

export default function App(props) {
    console.log(routes);
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Reloaded</title> 
            </Helmet> 
            {/* <Switch> */}
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))
                }
            {/* </Switch> */}
        </div>

                )
}

