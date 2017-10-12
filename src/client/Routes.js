
import React from 'react';
import { Route } from "react-router-dom";

import HelloWorld from "./components/HelloWorld";
import LoginContainer from "./containers/LoginContainer";
import IndexPageContainer from "./containers/IndexPageContainer";
import RegistrationContainer from "./containers/RegistrationContainer"
import FeedView from "./containers/FeedView.js";
import InvitePage from "./containers/InvitePage.js";
import ResetContainer from "./containers/ResetContainer.js";
import PasswordResetContainer from "./containers/PasswordResetContainer.js";
import BaseContainer from "./containers/BaseContainer.js";
import CommentContainer from "./containers/CommentContainer.js";
import SettingsContainer from "./containers/SettingsContainer.js";
import UpdateDetailsContainer from "./containers/UpdatedDetailsInput.js";
import TeamContainer from "./containers/TeamContainer.js";
import EditTeamContainer from "./containers/EditTeamContainer.js";
import NotificationContainer from "./containers/NotificationContainer.js";

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
				exact: true,
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
				path: "/resource/:resourceId/comments",
				component: CommentContainer
			},
			{
				path: "/settings",
				component: SettingsContainer
			},
			{
				path: "/team/:teamID/edit",
				component: EditTeamContainer
			},
			{
				path: "/team/:teamID",
				component: TeamContainer,
				exact: true
			},
			{
				path: "/notifications",
				component: NotificationContainer
			}, {
				path: "/",
				component: IndexPageContainer
			}
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
