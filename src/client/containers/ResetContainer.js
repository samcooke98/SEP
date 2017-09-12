/*
* Container for Requesting a Passowrd Reset
* Uses internal state only, althoguh it does connect to redux, just in case.
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { resetPass } from "../redux/actions.js";

import Input from 'react-toolbox/lib/input';
import Button from "react-toolbox/lib/button";

class ResetContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            success: false  
        }
    }

    handleChange = (value) => {
        this.setState({ email: value })
    }

    submitForm = async (evt) => {
        evt.preventDefault();

        var result = resetPass(this.state.email);
        var action = await result.payload;
        if(action.success) {
            this.setState({success: true});
        }
    }

    render() {
        if (this.state.success)
            return (
                <div>
                    <h3> Success </h3> 
                </div>)
        else
            return (
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                    <h1> Forgot your password? </h1>
                    <p> No worries, just enter your registered email address below, and we'll send you the next steps </p>
                    <Input type='text' label="Email" name='email' value={this.state.email} onChange={this.handleChange} />
                    <Button label='Submit' raised primary onClick={this.submitForm} />
                </div>
            )
    }
}


const mapStateToProps = (state) => {
    return {

    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetContainer));
