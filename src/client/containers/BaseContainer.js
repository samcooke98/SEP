/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { Layout } from "react-toolbox/lib/layout";

import { RouteWithSubRoutes } from "../Routes.js";
import { AppBar, Panel, NavDrawer, Link as RTLink } from 'react-toolbox';
import { List, ListItem, ListDivider } from "react-toolbox";
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/link';
import IndexPageContainer from "./IndexPageContainer.js"
<<<<<<< HEAD

/**
 * Data to populate the navigation list with 
 */
const link = (caption, to) => ({ caption, to, ...arguments })

const NavigationList = [
    {
        caption: "Login", //You can define an entry like this, or use the helper function. Any extra arguments will be passed as props
        to: "/login"
    },
    link("Register", "/register"),
    {
        divider: true //Any object that doesn't have 'to', and 'caption' defined will render as a divider
    },
    {
        caption: "Feed", //You can define an entry like this, or use the helper function. Any extra arguments will be passed as props
        to: "/feed",
        loginOnly: true
    },
    {
        caption: "Team Management",
        to: "/manage",
        loginOnly: true
    },
    {
        divider: true,
    },
    link("Settings", "/settings")
]
=======
>>>>>>> Fixing UI for landing page


class BaseContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    navigateWithRouter = (to, event) => {
        //We will use React-Router to route, instead of making a request
        //This pretty much comes from the react-router code
        console.log(arguments);
        console.log(to);
        if (
            !event.defaultPrevented && // onClick prevented default
            event.button === 0  // ignore everything but left clicks
        ) {
            event.preventDefault();
            this.props.history.push(to)
        }
    }
    render() {
<<<<<<< HEAD
=======
        if (this.props.match.isExact) return <IndexPageContainer/>
        console.log(this.props);
        console.log(this.props.routes);
        //Ideally, these would be all components, and this would have no control on the visuals
>>>>>>> Fixing UI for landing page
        return (
            <Layout>
                <AppBar title='TeamShare' fixed flat />
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


                                }
                                )
                            }
                        </List>

                    </Navigation>
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
    return {
        loggedIn: state.misc.loggedIn
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseContainer));
