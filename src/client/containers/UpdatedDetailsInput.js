import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { sendInvitations } from "../redux/actions.js";
import { withProtection } from "./Protector.js";
import { updateDetails } from "../redux/actions.js";


import Button from "react-toolbox/lib/button";
import Input from "react-toolbox/lib/input";
import AvatarSelection from "../components/AvatarSelection.js";

import isEmail from "validator/lib/isEmail"

class UpdatedDetailsInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: { value: '', error: '' },
            newPassword: { value: '', error: '' },
            confirmNewPassword: { value: '', error: '' },
            firstName: { value: '', error: '' },
            lastName: { value: '', error: '' },
            avatarURI: {value: '', error: ''}
        }
    }

    componentDidMount() { 
        this.setState({avatarURI: { value: this.props.avatarURI }})
    }

    handleChange = (value, name) => {
        this.setState({ [name]: { value, error: this.state[name].error } }, () => this.calcErrors())
    }

    //TO-DO -> focus on the this later.
    submitForm = (evt) => {
        console.log("Submitting form");
        evt.preventDefault();
        debugger;
        const shouldSubmit = !this.calcErrors();
        console.log(shouldSubmit);

        if (shouldSubmit) {
            const data = this.props.updateDetails(
                this.state.email.value,
                this.state.newPassword.value,
                this.state.firstName.value,
                this.state.lastName.value,
                this.state.avatarURI.value
            ).then( (result) => { 
                console.log(result);
                if(result.payload.success)
                    this.props.history.push('/feed')
            })
            this.clearErrors();
        } else { 
            console.log(this.state)
        }
    }

    // TODO: GET THE PASSWORD CHECK WORKING!!!! THIS DOES NOT WORK @SAM @VISH @JOEY
    calcErrors = () => {
        let hasError = false;
        if(this.state.firstName.value == '') { 
            this.setState({firstName: { value: this.state.firstName.value, error: "Cannot be blank!" }})
            hasError = true;
        } else { 
            this.setState({firstName: {value: this.state.firstName.value, error: ''}})
        }
        if(this.state.lastName.value == '') { 
            this.setState({lastName: { value: this.state.lastName.value, error: "Cannot be blank!" }})
            hasError = true;
        }else { 
            this.setState({lastName: {value: this.state.lastName.value, error: ''}})
        }

        if (this.state.newPassword.value != this.state.confirmNewPassword.value) {
            console.log("here");
            this.setState({
                newPassword: { ...this.state.newPassword, error: "The passwords do not match" },
                confirmNewPassword: { ...this.state.confirmNewPassword, error: "The passwords do not match" }
            })
            hasError = true;
        } else {
            this.setState({
                newPassword: { ...this.state.newPassword, error: "" },
                confirmNewPassword: { ...this.state.confirmNewPassword, error: "" }
            })
        }

        if (isEmail(this.state.email.value)) {
            this.setState({ email: { value: this.state.email.value, error: "" } })
        } else {
            hasError = true;
            console.log("invalid email")            
            this.setState({ email: { value: this.state.email.value, error: "Invalid Email" } })
        }
        return hasError;      
    }

    componentWillReceiveProps(nextProps) {
        this.reset(nextProps);
    }

    componentWillMount() {
        this.reset(this.props);
    }

    clearErrors = () => {
        for (var container in this.state) {
            this.setState({ [container]: { ...this.state[container], error: "" } })
        }
    }

    reset = (props) => {
        this.setState({ email: { value: props.user.username } })
        this.setState({ firstName: { value: props.user.firstName } })
        this.setState({ lastName: { value: props.user.lastName } })
    }

    render() {
        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>

                <form onSubmit={this.submitForm}>
                    <Input type='text' name='email' label='Email' value={this.state.email.value} error={this.state.email.error} onChange={(val) => this.handleChange(val, "email")} />
                    <Input type='text' label='First Name' name='firstName' value={this.state.firstName.value} error={this.state.firstName.error} onChange={(val) => this.handleChange(val, "firstName")} />
                    <Input type='text' label='Last Name' name='lastName' value={this.state.lastName.value} error={this.state.lastName.error} onChange={(val) => this.handleChange(val, "lastName")} />
                    {/* <Input type='password' label='Old password' name='oldPassword' onChange={(val) => this.handleChange(val, "oldPassword")} /> */}
                    <Input type='password' label='New Password' name='newPassword' value={this.state.newPassword.value} error={this.state.newPassword.error} onChange={(val) => this.handleChange(val, "newPassword")} />
                    <Input type='password' label='Confirm New Password' name='confirmNewPassword' value={this.state.confirmNewPassword.value} error={this.state.confirmNewPassword.error} onChange={(val) => this.handleChange(val, "confirmNewPassword")} />
                    <AvatarSelection name={this.state.firstName.value} image={this.state.avatarURI.value} setURI={(uri) => this.setState({ avatarURI: {value: uri } })} />
                    <Button label='Submit' raised primary onClick={this.submitForm} />
                </form>

            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        loggedIn: state.misc.loggedIn,
        avatarURI: state.data.users[state.misc.userID].avatarURI,
        user: state.data.users[state.misc.userID]
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        updateDetails: (email, newPassword, firstName, lastName, avatarURI) => dispatch(updateDetails(email, newPassword, firstName, lastName, avatarURI))

    }
}

export default
    withProtection(
        withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdatedDetailsInput))
    );

