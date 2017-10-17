import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

import { withProtection } from "./Protector.js";
import Container from "../components/Container.js";
import UserCard from "../components/UserCard.js";
import { Snackbar, Button } from "react-toolbox"
import { getResources, getUsers, removeUserFromTeam } from "../redux/actions.js";

class EditTeamContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
    }

    componentDidMount() {

        const a = this.props.getUsers();
        a.then( (val) => console.log("promise resolved with " + val))
        this.props.getResources();
    }

    removeUser = (userID) => {
        console.log("Removing User");

        const promise = this.props.removeUser(userID)

    }

    render() {
        const { team, user } = this.props;
        const isOwner = team.owner == user._id;
        console.log(this.props.users);
        return (
            <Container>
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <span style={{ flexGrow: 1 }}>
                        <h1> {team.teamName} </h1>
                        <p> {team.description} </p>
                    </span>
                </div>
                {/* Really need to take this into a Grid Component  */}
                <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }} >
                    {this.props.users.map(
                        (user) => user && (
                            <UserCard
                                key={user._id}
                                _id={user._id}
                                isTeamOwner={user._id == this.props.teamOwner}
                                avatar={user.avatarURI}
                                name={user.firstName + " " + user.lastName}
                                onRemove={() => { this.removeUser(user._id) }}
                            />
                        )
                    )}
                </div>
                {/* <Snackbar
                    action="Undo"
                    label="Removed ${name} from the team"
                    active={this.state.active}
                    onClick={this.handle}
                    timeout={2000}
                    onTimeout={() => this.setState({active:false})}
                    type='warning'
                /> */}

            </Container >
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const teamID = ownProps.match.params.teamID;
    const team = state.data.teams[teamID]
    const users = state.data.users;

    return {
        team: team,
        teamOwner: team.owner,
        user: state.data.users[state.misc.userID],
        users: team.members.map((id) => state.data.users[id]),
        resources: (team.resources || []).map((resourceID) => state.data.resources[resourceID])
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const teamID = ownProps.match.params.teamID
    return {
        getResources: () => dispatch(getResources(teamID)),
        getUsers: () => dispatch(getUsers(teamID)),
        removeUser: (userID) => dispatch(removeUserFromTeam(userID, teamID))

    }
}

export default withProtection(
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(EditTeamContainer)
    )
)