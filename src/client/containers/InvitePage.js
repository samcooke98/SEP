/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getInviteInfo, joinTeam } from "../redux/actions.js";

class InviteContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
        }
    }

    handleChange = (evt) => {
        const target = evt.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value })
    }

    submitForm = (evt) => {
        evt.preventDefault();
        //Confirm password's match
        if(this.state.password == this.state.confirmPassword)
            this.props.submit( this.state.email, this.state.firstname, this.state.lastname, this.state.password, this.props.match.params.id )
        else
            console.warn("Password's don't match");
        //TODO: Actually display a message saying this
        //username, firstname,lastname, password
    }

    render() {
        if (!this.props.teams) {
            this.props.getInfo(this.props.match.params.id)
            return <div> Loading </div>
        } else {
            return (
                <div>
                    You have been invited to join team: {this.props.teams.teamName}

                    <form>
                        First Name:<br />
                        <input type='text' name='firstname' value={this.state.firstname} onChange={this.handleChange} />
                        <br />

                        Last Name:<br/> 
                        <input type='text' name='lastname' value={this.state.lastname} onChange={this.handleChange}/> 
                        <br/> 

                        Email:<br/>
                        <input type='text' name='email' value={this.state.email} onChange={this.handleChange} />
                        <br />
                        Password:<br/>
                        <input type='password' name='password' value={this.state.password} onChange={this.handleChange} /> <br/>
                        Confirm Password:<br/>
                        <input type='password' name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleChange} /> <br/>

                        <input type='submit' onClick={this.submitForm}/> 
                    </form>

                </div >
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        teams: state.teams
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
