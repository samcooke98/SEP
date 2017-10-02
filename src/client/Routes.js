
import React from 'react';
import { Route } from 'react-router';


import HelloWorld from "./components/HelloWorld";
import LoginContainer from "./containers/LoginContainer";
import IndexPageContainer from "./containers/IndexPageContainer";
import RegistrationContainer from "./containers/RegistrationContainer"
import FeedView from "./containers/FeedView.js";
import TeamManagement from "./containers/TeamManagement.js"
import InvitePage from "./containers/InvitePage.js";
import ResetContainer from "./containers/ResetContainer.js";
import PasswordResetContainer from "./containers/PasswordResetContainer.js";
import BaseContainer from "./containers/BaseContainer.js";
import CommentContainer from "./containers/CommentContainer.js";
import SettingsContainer from "./containers/SettingsContainer.js";
import UpdateDetailsContainer from "./containers/UpdatedDetailsInput.js";

export const routes = [

    {
        path: "/",
        // exact: true,
        component: BaseContainer,
        routes: [
            
            {
                path: "/feed",
                exact: true,
                component: FeedView
            },
            {
                path: '/updateDetails',
                exact:true,
                component: UpdateDetailsContainer
            },
            {
                path: '/login',
                exact: true,
                component: LoginContainer
            },
            {
                path: '/register',
                exact: true,
                component: RegistrationContainer
            },
            {
                path: '/manage',
                exact: true,
                component: TeamManagement
            },
            {
                path: "/invite/:id",
                component: InvitePage
            }, {
                path: "/resetpassword",
                component: ResetContainer
            },
            {
                path: "/reset/confirm",
                component: PasswordResetContainer
            },
            {
                path: "/:url/comments",
                component: CommentContainer
            },
            {
                path: "/settings",
                component: SettingsContainer
            },
            { 
                path: "/",
                exact: true,
                component: IndexPageContainer
            },
        ]
    },
]

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
    )} />
)