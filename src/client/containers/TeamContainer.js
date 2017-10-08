import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

import { withProtection } from "./Protector.js";
import Container from "../components/Container.js";
import ResourceList from "../components/ResourceList.js";

import { getResources } from "../redux/actions.js";


class TeamContainer extends React.Component {

    componentDidMount() {
        this.props.getResources();
    }

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
                    <IconMenu icon="more_vert" >
                        <MenuItem value="blah" caption="Blah" />
                        <MenuItem value="blah" caption="Blah" />
                        <MenuItem value="blah" caption="Blah" />
                        {isOwner &&
                            [
                                <MenuDivider />,
                                <MenuItem value="edit_user" caption="Edit Members"/>
                            ]
                        }

                    </IconMenu>
                </div >
                <p> DIVIDER </p>
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
        resources: (team.resources || []).map((resourceID) => state.data.resources[resourceID])
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getResources: () => dispatch(getResources(ownProps.match.params.teamID))

    }
}

export default withProtection(
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(TeamContainer)
    )
)