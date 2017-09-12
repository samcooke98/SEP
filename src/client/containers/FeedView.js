/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserDetails, createResource, getResources, deleteResource } from "../redux/actions.js";

import { Button, IconButton } from 'react-toolbox/lib/button';
import ResourceForm from "../components/ResourceForm.js";
import LinkCard from "../components/LinkCard.js";
import LoggedInRedirector from "./LoggedInRedirector"
import { withProtection } from "./Protector.js";


class FeedView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            title: '',
            description: '',
            teams: []

        }
    }

    handleChange = (value, name, isTeam) => {
        console.log(value, name, isTeam);
        if (isTeam) {
            var state = Object.assign({}, this.state);
            state.teams[name].checked = value;
            this.setState(state);
        } else {
            this.setState({ [name]: value })
        }

    }

    submit = (evt) => {
        console.log(this.props);
        for (var team of this.state.teams) {
            if (team.checked)
                this.props.createResource(this.state.url, this.state.title, this.state.description, team._id)
        }
    }

    remove = (id) => {
        this.props.rmResource(id)
    }

    componentDidMount() {
        //Map the Teams that the user belongs to (Just in case there is more stored locally for some reason)
        let teams = this.props.user.teams.map((val) => this.props.teams[val]);
        //Create a property to hold if the team is checked or not
        teams = teams.map((val) => (val.checked = false, val))
        //Insert it into state 
        this.setState({ teams: teams })

        //Get the resources for each team that the user belongs to
        teams.forEach((val) => this.props.getResources(val._id))
    }

    render() {
        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                <h1>Hello {this.props.user.firstName} </h1>
                <p>Add a new entry below </p>
                <ResourceForm
                    url={this.state.url}
                    title={this.state.title}
                    description={this.state.description}
                    teams={this.state.teams}
                    handleChange={this.handleChange}
                />
                <Button icon='add' floating onMouseUp={this.submit} />
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: "wrap", flex: 1, flexDirection: 'row' }}>

                    { /*TODO: Show only teams that user belongs to, Sort the order */
                        this.props.resourceIDs.map((id) => {
                            let resource = this.props.resources[id]
                            return <LinkCard
                                title={resource.title || ''}
                                subtitle={resource.url}
                                text={resource.description}
                                url={resource.url}
                                key={resource._id}
                                removeFunc={this.remove.bind(this, resource._id)}
                            />
                        })
                    }
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
        resources: state.data.resources || {},
        resourceIDs: state.ui.resources || []
        // resources: (state.data || {}).resources
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUserDetails()),
        createResource: (url, title, description, team) => dispatch(createResource(url, title, description, team)),
        getResources: (teamID) => dispatch(getResources(teamID)),
        rmResource: (id) => dispatch(deleteResource(id)),
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withProtection(withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedView)));
