import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import { Button, Dialog } from "react-toolbox";


import { withProtection } from "./Protector.js";
import Container from "../components/Container.js";
import InviteDialog from "../components/InviteDialog.js";

import ResourceList from "../components/ResourceList.js";

import { getResources, sendInvitations, leaveTeam, deleteResource, createResource } from "../redux/actions.js";

import ResourceForm from "../components/ResourceForm.js";

class TeamContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dialogOpen: false,
            error: '',
            value: '',
            resourceFormOpen: false,
            url: '',
            title: "",
            tags: [],
            description: '',
        }
    }

    componentDidMount() {
        this.props.getResources();
    }

    openInvite = () => {
        this.setState({ dialogOpen: true });
    }

    closeInvite = () => this.setState({ dialogOpen: false })

    handleChange = (value, name) => this.setState({ [name]: value })

    render() {
        const { team, user } = this.props;
        const isOwner = team.owner == user._id;

        return (
            <Container>
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <span style={{ flexGrow: 1 }}>
                        <h1> {team.teamName} </h1>
                        <p> {team.description} </p>
                    </span>

                    <IconMenu icon="more_vert">

                        {isOwner &&
                            <MenuItem value="edit_user" caption="Edit Members" onClick={
                                () => this.props.history.push(`/team/${team._id}/edit`)
                            } />
                        }
                        {!isOwner &&
                            <MenuItem
                                value="leave" caption="Leave Team" onClick={
                                    () => {
                                        this.props.leaveTeam();
                                        this.props.history.push("/feed")
                                    }
                                }
                            />
                        }
                    </IconMenu>

                </div >
                {isOwner &&
                    <Button icon='email' name='inviteUser' label='Invite Users' raised primary onClick={this.openInvite} />
                }
                <Button name="addLink" label="Add a new Entry" raised primary onClick={this.openSubmit} />
                <ResourceForm
                    active={this.state.resourceFormOpen}
                    toggleDialog={() => this.setState({ resourceFormOpen: !this.state.resourceFormOpen })}
                    url={this.state.url}
                    title={this.state.title}
                    tags={this.state.tags}
                    handleChange={this.handleChange}
                    description={this.state.description}
                    submit={this.createResource}

                />
                <InviteDialog
                    active={this.state.dialogOpen}
                    close={this.closeInvite}
                    error={this.state.inviteSuccess ? '' : this.props.inviteMsg}
                    handleChange={(value) => this.setState({value: value})}
                    value={this.state.value}
                    onClick={() => this.props.send(this.state.value)}
                />
                <p />
                <ResourceList
                    resources={this.props.resources}
                    navigate={(to) => this.props.history.push(to)}
                    deleteResource={this.props.rmResource}
                    userOwnedTeams={[this.props.team._id]}
                />

            </Container >
        )
    }

    openSubmit = () => this.setState({ resourceFormOpen: true })
    handleChange = (value, name) => this.setState({ [name]: value })

    createResource= (evt) => { 
        evt.preventDefault();
        this.props.createResource(this.state.url, this.state.title, this.state.description, this.state.tags).then( 
            (value) => {
                console.log(value);
                if(value.payload.success) { 
                    this.setState({resourceFormOpen: false})
                } else { 
                    console.log("ERROR")
                    console.log(value)
                }
            }
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const teamID = ownProps.match.params.teamID;
    const team = state.data.teams[teamID]
    return {
        team: team,
        user: state.data.users[state.misc.userID],
        resources: (team.resources || []).map((resourceID) => state.data.resources[resourceID] || null),
        inviteSuccess: state.ui.inviteSuccess || null,
        inviteMsg: state.ui.inviteMsg || ''
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const teamID = ownProps.match.params.teamID;
    console.log(teamID);
    return {
        getResources: () => dispatch(getResources(teamID)),
        send: (emails) => dispatch(sendInvitations(teamID, emails)),
        leaveTeam: () => dispatch(leaveTeam(teamID)),
        rmResource: (id) => dispatch(deleteResource(id)),
        createResource: (url, title, description, tags) => dispatch(createResource(url, title, description, teamID, tags)),


    }
}

export default withProtection(
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(TeamContainer)
    )
)