/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import LoggedInRedirector from "./LoggedInRedirector";
import Input from 'react-toolbox/lib/input';
import Button from "react-toolbox/lib/button";

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleUpdate = (name, value) => {

        this.setState({ [name]: value })
    }

    submitForm = (evt) => {
        evt.preventDefault();
        this.props.signIn(this.state.email, this.state.password)
    }

    render() {
        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                <h1> Login </h1> 
                {this.props.loggedIn && <Redirect to='/feed' />}
                <h3> {this.props.errorMsg} </h3>
                <Input type='text' label="Email" name='email' value={this.state.email} onChange={this.handleUpdate.bind(this, "email")} />
                <Input type='password' label='Password' name='password' value={this.state.password} onChange={this.handleUpdate.bind(this, "password")} />
                <Link to='/resetpassword'> Forgot Password? </Link> <br/> <br/>
                <Button label='Submit' raised primary onClick={this.submitForm}/>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        errorMsg: state.ui.loginMsg || '',
        loggedIn: state.misc.loggedIn

    }
}

import { login } from "../redux/actions.js";

//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (username, password) => dispatch(login(username, password))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
