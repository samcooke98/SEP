/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux"
import { Layout } from "react-toolbox/lib/layout";
import { AppBar, Panel, NavDrawer, Link as RTLink } from 'react-toolbox';
import { List, ListItem, ListDivider } from "react-toolbox";
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/link';
import { MenuItem, MenuDivider } from 'react-toolbox/lib/menu';


import { RouteWithSubRoutes } from "../Routes.js";
import IndexPageContainer from "./IndexPageContainer.js"
import User from "../components/UserButton/UserButton.js";
import { logout } from "../redux/actions.js";

/**
 * Data to populate the navigation list with 
 */
const link = (caption, to) => ({ caption, to, ...arguments })

// const NavigationList = [
//     {
//         caption: "Login", //You can define an entry like this, or use the helper function. Any extra arguments will be passed as props
//         to: "/login"
//     },
//     link("Register", "/register"),
//     {
//         divider: true //Any object that doesn't have 'to', and 'caption' defined will render as a divider
//     },
//     {
//         caption: "Feed", //You can define an entry like this, or use the helper function. Any extra arguments will be passed as props
//         to: "/feed",
//         loginOnly: true
//     },
//     {
//         caption: "Team Management",
//         to: "/manage",
//         loginOnly: true
//     },
//     {
//         divider: true,
//     },
//     link("Settings", "/settings")
// ]


class BaseContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    navigateWithRouter = (to, event) => {
        //We will use React-Router to route, instead of making a request
        //This pretty much comes from the react-router code
        if (
            !event.defaultPrevented && // onClick prevented default
            event.button === 0  // ignore everything but left clicks
        ) {
            event.preventDefault();
            this.props.history.push(to)
        }
    }
    render() {
        return (
            <Layout>
                <AppBar title='TeamShare' fixed flat>
                    <Navigation type='horizontal'>
                        {this.props.loggedIn &&
                            <User
                                avatar={this.props.avatar}
                                name={this.props.name}
                            >
                                {/* We can put MenuItems here */}
                                <MenuItem value="edit" caption="Edit Profile" onClick={
                                    () => this.props.history.push('/edit')
                                } />
                                <MenuDivider />
                                <MenuItem value="blah" caption="Logout" onClick={
                                    () => {
                                        this.props.logout();
                                        this.props.history.push("/");
                                    }
                                } />
                            </User>
                        }
                    </Navigation>
                </AppBar>
                <NavDrawer pinned active clipped permanentAt='sm'>
                    <Navigation type='vertical'>
                        <List selectable ripple>
                            {/*So we wrap the router on */}
                            {
                                NavigationList.map((val, index) => {
                                    /* return (val.caption !== undefined && val.to !== undefined
                                        ? <ListItem
                                            {...val}
                                            onClick={this.navigateWithRouter.bind(this, val.to)}
                                            className={this.props.location.pathname == val.to ? 'active' : ''}
                                            key={index}
                                        />
                                        : <ListDivider key={index} />) */
                                    if (val.loginOnly) {
                                        if (this.props.loggedIn) {
                                            return (<ListItem
                                                {...val}
                                                onClick={this.navigateWithRouter.bind(this, val.to)}
                                                className={this.props.location.pathname == val.to ? 'active' : ''}
                                                key={index}
                                            />);
                                        }
                                    } else {
                                        if (val.caption !== undefined && val.to !== undefined) {
                                            return (<ListItem
                                                {...val}
                                                onClick={this.navigateWithRouter.bind(this, val.to)}
                                                className={this.props.location.pathname == val.to ? 'active' : ''}
                                                key={index}
                                            />)
                                        } else {
                                            return (<ListDivider key={index} />)
                                        }
                                    }
                                } />
                            </User>
                        }
                        {
                            !this.props.loggedIn &&
                            <Navigation type="horizontal">
                                <RTLink href="/login" label="Login" active />
                                <RTLink href="/register" label="Register"  />
                                <RTLink href="/" label="Home"  />
                            </Navigation>
                        }
                    </Navigation>
                </AppBar>
                <NavDrawer pinned={this.props.loggedIn} active={false} clipped >
                    {this.props.loggedIn &&
                        <NavigationList
                            teams={this.props.teams}
                        />
                    }
                </NavDrawer>
                <Panel>
                    <Switch>
                        {this.props.routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </Panel>
            </Layout>
        )
    }
}


const mapStateToProps = (state) => {
    if (!state.misc.loggedIn)
<<<<<<< HEAD
        return {
            loggedIn: false,
            teams: []
        }
=======
        return { loggedIn: false }
>>>>>>> 3a536bdb3d38810d0078641fa89d9efd2f509e38
    else {
        const user = state.data.users[state.misc.userID]

        return {
            loggedIn: state.misc.loggedIn,
            name: user.firstName + " " + user.lastName,
<<<<<<< HEAD
            avatar: user.avatarURI,
            teams: user.teams.map((val) => state.data.teams[val])
=======
            avatar: user.avatarURI
>>>>>>> 3a536bdb3d38810d0078641fa89d9efd2f509e38
        }
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseContainer));
