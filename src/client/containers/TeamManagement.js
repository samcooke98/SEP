/*
* TeamManagement - For now, creation of invitations 
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { sendInvitations } from "../redux/actions.js";
import { withProtection } from "./Protector.js";

import Button from "react-toolbox/lib/button";
import Input from "react-toolbox/lib/input";


class TeamManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    submitForm = (teamID) => {
        this.props.send(
            teamID,
            this.state.value
        )
    }

    handleChange = (val) => {
        this.setState({ value: val })
    }

    //Returns array of IDs that the user owners
    getOwnedTeams = () => {
        let result = [];
        for (var team in this.props.teams) {
            if (this.props.teams[team].owner == this.props.user._id) {
                result.push(team)
            }
        }
        return result
    }

    render() {
        //Ideally, these would be all components, and this would have no control on the visuals
        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                <h1> Team Management </h1>
                <p> Enter emails that you wish to send invitations to below, then select the team you wish to invite them to </p>
                <Input label="Emails: (john@smith.com; sally@peach.com) " onChange={this.handleChange.bind(this)} value={this.state.value} /> <br />
                {
                    this.getOwnedTeams().map((val, index) =>
                        <Button key={index} label={this.props.teams[val].teamName} primary raised onClick={this.submitForm.bind(this, val)} />  
                    )
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    var user = state.data.users[state.misc.userID]; //Gets the User Object
    return {
        user: user,
        teams: state.data.teams,


    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        send: (id, emails) => dispatch(sendInvitations(id, emails))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withProtection(withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamManagement)));
