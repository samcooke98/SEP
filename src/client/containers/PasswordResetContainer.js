/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassConfirm } from "../redux/actions.js";

import Button from "react-toolbox/lib/button";
import Input from 'react-toolbox/lib/input';

class PasswordResetContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: null,
            msg: null,
            error: '',
            password: '',
            passwordconfirm: ""
        }


    }

    handleChange = (name, value) => {
        const state = { ...this.state, [name]: value };
        this.setState({ [name]: value })
        this.calcErrors(state);
    }

    calcErrors = (state) => {
        console.log(state)
        if (state.password != state.passwordconfirm)
            this.setState({ error: 'Passwords do not match' })
        else {
            this.setState({ error: '' })
        }
    }

    submitForm = (evt) => {
        evt.preventDefault();
        const params = new URLSearchParams(this.props.location.search);
        console.log(params.get('RID'))
        var action = resetPassConfirm(this.state.password, this.props.match.params.id || params.get('RID'))
        action.payload.then((val) => {
            console.log(val)
            this.setState({ success: val.success, msg: val.payload })
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.success && !this.props.success) {
            this.setState({ success: true })
        } else {
            this.setState({ success: false })
        }
    }

    render() {
        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                <h1> Reset Password </h1>
                <p> Enter your new password below </p>
                {this.state.success === false && <p> Error: {this.state.msg}</p>}
                {this.state.success && <p> Your password has been reset </p>}
                <form onSubmit={this.submitForm}>
                    <Input type='password' label='Password' name='password' value={this.state.password} error={this.state.error} onChange={this.handleChange.bind(this, "password")} />
                    <Input type='password' label="Confirm Password" name='passwordconfirm' error={this.state.error} value={this.state.passwordconfirm} onChange={this.handleChange.bind(this, "passwordconfirm")} />
                    <Button label='Submit' raised primary onClick={this.submitForm} />
                    <input type='submit' style={{display: 'none'}} onSubmit={this.submitForm}/>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        success: state.ui.resetPassSuccess,
        error: state.ui.resetPassConfirm
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        submit: (password, id) => dispatch(resetPassConfirm(password, id))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordResetContainer));
