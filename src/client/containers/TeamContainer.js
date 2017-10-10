import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import { Button, Dialog } from "react-toolbox";


import { withProtection } from "./Protector.js";
import Container from "../components/Container.js";
import InviteDialog from "../components/InviteDialog.js";

import ResourceList from "../components/ResourceList.js";

import { getResources, sendInvitations } from "../redux/actions.js";


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

    handleChange= (value, argsb) => this.setState({value: value}) 

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

                    {isOwner &&
                        <IconMenu icon="more_vert">
                            <MenuItem value="edit_user" caption="Edit Members" onClick={
                                () => this.props.history.push(`/team/${team._id}/edit`)
                            } />
                        </IconMenu>
                    }
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
                    onClick={() => this.props.send( this.state.value) }
                />
                <p/>
                <ResourceList
                    resources={this.props.resources}
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
        resources: (team.resources || []).map((resourceID) => state.data.resources[resourceID]),
        inviteSuccess: state.ui.inviteSuccess || null,
        inviteMsg: state.ui.inviteMsg || ''
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const teamID = ownProps.match.params.teamID;
    console.log(teamID);
    return {
        getResources: () => dispatch(getResources(teamID)),
        send: (emails) => dispatch(sendInvitations(teamID, emails))
        

    }
}

export default withProtection(
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(TeamContainer)
    )
)