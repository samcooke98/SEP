/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserDetails, createResource, getResources, deleteResource } from "../redux/actions.js";
import { Button, IconButton } from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import ResourceForm from "../components/ResourceForm.js";
import LinkCard from "../components/LinkCard.js";
import LoggedInRedirector from "./LoggedInRedirector"
import { withProtection } from "./Protector.js";
import ResourceList from "../components/ResourceList.js";

class FeedView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            title: '',
            description: '',
            teams: [],
            isDialogOpen: false,
            tags: [],
            resourceFormOpen: false

        }
    }

    handleChange = (value, name, isTeam) => {
        if (isTeam) {
            var state = Object.assign({}, this.state);
            state.teams[name].checked = value;
            this.setState(state);
        } else {
            this.setState({ [name]: value })
        }

    }

    submit = (evt) => {
        for (var team of this.state.teams) {
            if (team.checked)
                this.props.createResource(this.state.url, this.state.title, this.state.description, team._id, this.state.tags).then((val) => {
                    if (val.payload.success)
                        this.toggleDialog();
                })
        }
        console.log('this evt' + evt);
        //this.toggleDialog();
    }

    remove = (id) => {
        this.props.rmResource(id)
    }

    toggleDialog = () => {
        this.setState({ isDialogOpen: !this.state.isDialogOpen });
    }

    componentDidMount() {
        //Map the Teams that the user belongs to (Just in case there is more stored locally for some reason)
        let teams = this.props.user.teams.map((val) => this.props.teams[val]);

        //Create a property to hold if the team is checked or not
        teams = teams.map((val) => (val.checked = false, val))

        ////Insert it into state 
        this.setState({ teams: teams })

        //Get the resources for each team that the user belongs to
        teams.map((team) => {
            this.props.getResources(team._id)
        })

    }

    navigateWithRouter = (to, event) => {
        //We will use React-Router to route, instead of making a request
        //This pretty much comes from the react-router code
        console.log(arguments);

        if (
            !event.defaultPrevented && // onClick prevented default
            event.button === 0  // ignore everything but left clicks
        ) {
            event.preventDefault();
            this.props.history.push(to);
        }
    }

    render() {
        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                <h1>Hello {this.props.user.firstName} </h1>
                <div style={{}}>
                    <Button label='Add a new entry' flat primary onMouseUp={this.toggleDialog} />
                </div>
                <ResourceForm
                    active={this.state.isDialogOpen}
                    toggleDialog={() => this.setState({ isDialogOpen: !this.state.isDialogOpen })}
                    url={this.state.url}
                    title={this.state.title}
                    tags={this.state.tags}
                    handleChange={this.handleChange}
                    description={this.state.description}
                    submit={this.submit}
                    teams={this.state.teams}
                />
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: "wrap", flex: 1, flexDirection: 'row' }}>
                    <ResourceList
                        resources={this.props.resourceIDs.map((id) => this.props.resources[id])}
                        navigate={(to) => this.props.history.push(to)}
                        deleteResource={this.props.rmResource}
                        userOwnedTeams={Object.keys(this.props.teams).map(id =>
                            this.props.teams[id].owner == this.props.user._id
                                ? id
                                : null
                        )}
                    />

                </div>
            </div>
        )
    }
}




const mapStateToProps = (state) => {
    var user = state.data.users[state.misc.userID]; //Gets the User Object
    return {
        user: user,
        teams: state.data.teams,
        userTeams: user.teams,
        resources: state.data.resources || {},
        resourceIDs: Object.keys(state.data.resources) || []
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUserDetails()),
        createResource: (url, title, description, team, tags) => dispatch(createResource(url, title, description, team, tags)),
        getResources: (teamID) => dispatch(getResources(teamID)),
        rmResource: (id) => dispatch(deleteResource(id)),
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withProtection(withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedView)));
