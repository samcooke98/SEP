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

import isEmail from 'validator/lib/isEmail';


class TeamManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: '',
        }
    }

    submitForm = (teamID) => {
        var emails = this.state.value.split(";")
        emails = emails.map((str) => str.replace(" ", '') )
        var promises = [];
        for (var email of emails) {
            if (!isEmail(email)) {
                this.setState({ error: "It looks like there are some invalid emails, please check and try again" })
                return;
            }
        }
        for (var email of emails) {
            promises.push(sendInvitations(teamID, email).payload);
        }
        Promise.all(promises).then((val) => {
            this.setState({ message: "Sent invitation!" })
        })
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
                <Input label="Emails: (john@smith.com; sally@peach.com)" name='email' error={this.state.error} onChange={this.handleChange.bind(this)} value={this.state.value} /> <br />
                {
                    this.getOwnedTeams().map((val, index) =>
                        <Button key={index} label={this.props.teams[val].teamName} primary raised onClick={this.submitForm.bind(this, val)} />
                    )
                }
                {this.state.message && <h3> {this.state.message} </h3>}
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
