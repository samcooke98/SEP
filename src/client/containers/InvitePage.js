/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getInviteInfo, joinTeam } from "../redux/actions.js";

import Input from "react-toolbox/lib/input";
import Button from "react-toolbox/lib/button";

class InviteContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: { value: '', error: '' },
            password: { value: '', error: '' },
            passwordConfirm: { value: '', error: '' },
            firstname: { value: '', error: '' },
            lastname: { value: '', error: '' },
            submitted: false
        }
    }

    handleChange = (name, value) => {
        this.setState({ [name]: { value, error: this.state[name].error } })
    }


    clearErrors = () => {
        for (var container in this.state) {
            this.setState({ [container]: { ...this.state[container], error: "" } })
        }
    }

    submitForm = (evt) => {
        evt.preventDefault();
        //Confirm password's match
        if (this.state.password.value == this.state.passwordConfirm.value) {
            this.clearErrors();
            this.props.submit(this.state.email.value, this.state.firstname.value, this.state.lastname.value, this.state.password.value, this.props.match.params.id)
        }
        else {
            this.setState({
                password: { ...this.state.password, error: "The passwords do not match" },
                passwordConfirm: { ...this.state.passwordConfirm, error: "The passwords do not match" }
            })
        }
        //TODO: Validate username, firstname,lastname, password
    }

    componentWillMount() {
        console.log('Will Mount');
        this.props.getInfo(this.props.match.params.id);
    }

    componentWillUpdate( nextProps, nextState ) {
        if(nextProps.worked && this.state.submitted) { 
            console.log(nextProps);
            console.log(this.props);
            //Render Success Page 
            nextProps.history.push("/feed");
        }
    }

    render() {
        if (this.props.invitedID == undefined) return <div> Loading </div>
        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                <h1> Join the team: "{(this.props.teams[this.props.invitedID]).teamName}" on TeamShare </h1>

                <form>
                    <Input type='text' name='email' label='Email' value={this.state.email.value} error={this.state.email.error} onChange={this.handleChange.bind(this, "email")} />
                    <Input type='password' name='password' label='Password' value={this.state.password.value} error={this.state.password.error} onChange={this.handleChange.bind(this, "password")} />
                    <Input type='password' name='passwordConfirm' label="Confirm Password" value={this.state.passwordConfirm.value}
                        onChange={this.handleChange.bind(this, "passwordConfirm")} error={this.state.passwordConfirm.error}
                    />
                    <Input type='text' name='firstname' label="First Name" value={this.state.firstname.value} error={this.state.firstname.error} onChange={this.handleChange.bind(this, "firstname")} />
                    <Input type='text' name='lastname' label="Last Name" value={this.state.lastname.value} error={this.state.lastname.error} onChange={this.handleChange.bind(this, "lastname")} />


                    <Button label='Submit' raised primary onClick={this.submitForm} />
                </form>

            </div >
        )
    }

}


const mapStateToProps = (state) => {
    return {
        teams: state.data.teams,
        invitedID: state.ui.invitedID,
        worked: state.ui.joinTeam,
        error: state.ui.joinTeamMsg

    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        getInfo: (inviteID) => dispatch(getInviteInfo(inviteID)),
        submit: (username, firstname, lastname, password, teamID) => dispatch(joinTeam(username, firstname, lastname, password, teamID))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InviteContainer));
