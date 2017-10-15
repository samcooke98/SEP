import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import { Button, Dialog } from "react-toolbox";


import { withProtection } from "./Protector.js";
import Container from "../components/Container.js";
import InviteDialog from "../components/InviteDialog.js";

import ResourceList from "../components/ResourceList.js";

import { getResources, sendInvitations, leaveTeam, deleteResource } from "../redux/actions.js";


class TeamContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dialogOpen: false,
            error: '',
            value: '',
        }
    }

    componentDidMount() {
        this.props.getResources();
    }

    openInvite = () => {
        this.setState({ dialogOpen: true });
    }

    closeInvite = () => this.setState({ dialogOpen: false })

    handleChange = (value) => this.setState({ value: value })

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
                    <Button icon='email' label='Invite Users' raised primary onClick={this.openInvite} />
                }
                <InviteDialog
                    active={this.state.dialogOpen}
                    close={this.closeInvite}
                    error={this.state.inviteSuccess ? '' : this.props.inviteMsg}
                    handleChange={this.handleChange}
                    value={this.state.value}
                    onClick={() => this.props.send(this.state.value)}
                />
                <p />
                <ResourceList
                    resources={this.props.resources}
                    navigate={(to) => this.props.history.push(to)}
                        deleteResource={this.props.rmResource}
                        userOwnedTeams={ [ this.props.team._id ]}
                />

            </Container >
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
        

    }
}

export default withProtection(
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(TeamContainer)
    )
)