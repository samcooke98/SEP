/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LoggedInRedirector from "./LoggedInRedirector";


class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: 'email', 
            password: '',
        }
    }

    handleUpdate = (evt) => { 
        const target = evt.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value })
    }

    submitForm = (evt) => { 
        evt.preventDefault();
        this.props.signIn(this.state.email, this.state.password)
    }

    render() {
        //Ideally, these would be all componenets, and this would have no control on the visuals
        return (
            <div>
                <LoggedInRedirector/> 
                Username: <br/> 
                <input type='text' name='email' value={this.state.email} onChange={this.handleUpdate}/> <br/>
                Password: <br/> 
                <input type='password' name='password' value={this.state.password} onChange={this.handleUpdate} /> <br/> 

                <button onClick={this.submitForm}> Login </button> 
            </div> 
        )
    }
}


const mapStateToProps = (state) => {
    return {

    }
}

import {login} from "../redux/actions.js";

//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (username, password) => dispatch(login( username, password ))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
