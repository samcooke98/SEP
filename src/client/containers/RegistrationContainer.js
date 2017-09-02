/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../redux/actions.js"
import LoggedInRedirector from "./LoggedInRedirector.js";




class RegistrationContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: "",
            teamname: "",
            teamdesc: "",
            teamcategory: ""
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

        var shouldSubmit = true;

        //Check no fields are empty
        for(var value in this.state) { 
            if(value === '' || value === "") 
                shouldSubmit = false;
        }
        if(shouldSubmit) 
            this.props.submitRegistration( 
                this.state.email, this.state.password, this.state.firstname, this.state.lastname, this.state.teamname, this.state.teamdesc, this.state.teamcategory
            )
    }

    render() {
        //Ideally, these would be all componenets, and this would have no control on the visuals
        return (
            <div>
                <LoggedInRedirector/> 
                <form>
                    Email: <br />
                    <input type='text' name='email' value={this.state.email} onChange={this.handleChange} />
                    <br />

                    Password: <br />
                    <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
                    <br />

                    First Name: <br />
                    <input type='text' name='firstname' value={this.state.firstname} onChange={this.handleChange} />
                    <br />

                    First Name: <br />
                    <input type='text' name='lastname' value={this.state.lastname} onChange={this.handleChange} />
                    <br />

                    --- Team Details --- <br/>
                    Team Name: <br />
                    <input type='text' name='teamname' value={this.state.teamname} onChange={this.handleChange} />
                    <br />

                    Team description: <br />
                    <input type='text' name='teamdesc' value={this.state.teamdesc} onChange={this.handleChange} />
                    <br />

                    Team Category: <br />
                    <input type='text' name='teamcategory' value={this.state.teamcategory} onChange={this.handleChange} />
                    <br />
            <br/> 
                    <input type='submit' onClick={this.submitForm}/> 



                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        submitRegistration: (username, password, firstName, lastName, teamName, description, category) => {
            register(username, password, firstName, lastName, teamName, description, category)
        }
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer));
