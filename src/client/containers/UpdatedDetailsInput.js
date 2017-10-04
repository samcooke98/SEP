import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { sendInvitations } from "../redux/actions.js";
import { withProtection } from "./Protector.js";
import { updateDetails } from "../redux/actions.js";


import Button from "react-toolbox/lib/button";
import Input from "react-toolbox/lib/input";
import UpdateForm from "../components/UpdatedDetailsInput.js";

class UpdatedDetailsInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: { value: '', error: '' },
            oldPassword: { value: '', error: ''},
			password: { value: '', error: '' },
			newPassword: { value: '', error: '' },
			firstName: { value: '', error: '' },
			lastName: { value: '', error: '' },

        }
    }
handleChange = (name, value) => {
		this.setState({ [name]: { value, error: this.state[name].error } })
    }

submitForm = (evt) => {
        evt.preventDefault();
        if (this.state.password.value == this.state.newPassword.value) {
            this.clearErrors();
            this.props.updateDetails(this.state.email.value, this.state.password.value, this.state.firstName.value, this.state.lastName.value)
        }
        else {
            this.setState({
                password: { ...this.state.password, error: "The passwords do not match" },
                passwordConfirm: { ...this.state.newPassword, error: "The passwords do not match" }
            })
        }
    }
    

    // submitForm = (evt) => {
    //     evt.preventDefault();
    //     this.props.signIn(this.state.email, this.state.password)
    // }
    componentWillReceiveProps(nextProps) {
    this.setState({ email: { value: nextProps.user.email }})
    this.setState({ firstName: { value: nextProps.user.firstName }})
    this.setState({ lastName: { value: nextProps.user.lastName }})
    }

    

   render() {
       return (
         <div style={{flex: 1, overflowY: 'auto', padding: '1.8rem'}}>
            <UpdateForm
             email={this.props.user.username}
             firstName={this.props.user.firstName}
             lastName={this.props.user.lastName}
             oldPassword={this.state.oldPassword.value}
             password={this.state.password.value}
             newPassword={this.state.newPassword.value}/>
            <Button label='Submit' raised primary onClick={this.submitForm} />
    
         </div>
       )
   }
}



const mapStateToProps = (state) => {
    return {
        loggedIn: state.misc.loggedIn,
        user: state.data.users[state.misc.userID] 
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        updateDetails: (email, password, firstName, lastName) => dispatch(updateDetails(email, password, firstName, lastName))
        //   this.props.updateDetails(email, password, firstName, lastName)

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdatedDetailsInput));

