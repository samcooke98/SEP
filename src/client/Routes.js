
import React from 'react';
import { Route } from 'react-router';


import HelloWorld from "./components/HelloWorld.js";

export const routes = [
    {
        path: "/about",
        component: (props) => <div> About page </div> 
    },
    {
        path: '/',
        component: HelloWorld,
        routes: [ 
            {
                path:"/taco/bus", 
                component: () => <div> Hello Page </div> 
            },
            {
                path: "/taco/abc", 
                component: () => <div> def </div> 
            }
        ]
    },
    // {
    //     path: '/tacos',
    //     component: Tacos,
    //     routes: [
    //         {
    //             path: '/tacos/bus',
    //             component: Bus
    //         },
    //         {
    //             path: '/tacos/cart',
    //             component: Cart
    //         }
    //     ]
    // }
]

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
    )} />
)