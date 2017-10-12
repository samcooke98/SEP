/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux"
import { Layout } from "react-toolbox/lib/layout";
import { AppBar, Panel, NavDrawer, Link as RTLink } from 'react-toolbox';
import { List, ListItem, ListDivider } from "react-toolbox";
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/link';
import { Button } from "react-toolbox";
import { MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

import { RouteWithSubRoutes } from "../Routes.js";
import IndexPageContainer from "./IndexPageContainer.js"
import User from "../components/UserButton/UserButton.js";
import { logout, createTeam } from "../redux/actions.js";
import NavigationList from "../components/NavigationList.js";
import styles from './BaseContainer.css';
import CreateTeam from "../components/CreateTeam.js";



class BaseContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            createTeamDialog: false,
        }
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

    toggleDialog = (evt) => { 
        this.setState({createTeamDialog: !this.state.createTeamDialog})
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
                                    () => this.props.history.push('/updateDetails')
                                } />
                                <MenuItem value="notifications" caption="Notifications" onClick={
                                    () => this.props.history.push('/notifications')
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
                        {
                            !this.props.loggedIn &&
                            <Navigation type="horizontal">
                                <RTLink href="/login" label="Login" active />
                                <RTLink href="/register" label="Register" />
                                <RTLink href="/" label="Home" />
                            </Navigation>
                        }
                    </Navigation>
                </AppBar>
                <NavDrawer pinned={this.props.loggedIn} active={false} clipped className={styles.navList} >
                    {this.props.loggedIn &&
                        <NavigationList className={styles.navBody}
                            teams={this.props.teams}
                        />
                    }
                    <footer className={styles.footer}> <Button label="Create a Team" floating={false} primary flat onClick={this.toggleDialog} /> </footer>
                </NavDrawer>
                <CreateTeam 
                    active={this.state.createTeamDialog}
                    close={this.toggleDialog}
                    createTeam={this.props.createTeam}
                />
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
        return {
            loggedIn: false,
            teams: []
        }
    else {
        const user = state.data.users[state.misc.userID]

        return {
            loggedIn: state.misc.loggedIn,
            name: user.firstName + " " + user.lastName,
            avatar: user.avatarURI,
            teams: user.teams.map((val) => state.data.teams[val])
        }
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        createTeam: ( teamName, teamDesc ) => dispatch( createTeam( teamName, teamDesc ) ) 
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseContainer));