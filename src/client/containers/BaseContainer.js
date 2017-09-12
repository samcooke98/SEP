/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { Layout } from "react-toolbox/lib/layout";

import { RouteWithSubRoutes } from "../Routes.js";
import { AppBar, Panel, NavDrawer, Link as RTLink } from 'react-toolbox';
import { List, ListItem, ListDivider } from "react-toolbox";
import Navigation from 'react-toolbox/lib/navigation';

import IndexPageContainer from "./IndexPageContainer.js"

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
    }
]


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
                                            return ( <ListDivider key={index} />) 
                                        }
                                    }


                                }
                                )
                            }
                        </List>

                    </Navigation>
                </NavDrawer>
                <Panel>
                    {this.props.routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
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
