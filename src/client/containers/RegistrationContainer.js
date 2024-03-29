/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../redux/actions.js"
import LoggedInRedirector from "./LoggedInRedirector.js";

import Input from 'react-toolbox/lib/input';
import Button, { IconButton } from "react-toolbox/lib/button";
import Autocomplete from 'react-toolbox/lib/autocomplete';

import AvatarSelection from "../components/AvatarSelection.js";
import isEmail from "validator/lib/isEmail";


const categories = [
	"Business", "School", "Fun", "Friends"
]


class RegistrationContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: { value: '', error: '' },
			password: { value: '', error: '' },
			passwordConfirm: { value: '', error: '' },
			firstname: { value: '', error: '' },
			lastname: { value: '', error: '' },
			teamname: { value: '', error: '' },
			teamdesc: { value: '', error: '' },
			teamcategory: { value: '', error: '' },
			avatarURI: '',
			success: false
		}
	}

	handleChange = (name, value) => {
		this.setState({ [name]: { value, error: this.state[name].error } })
	}

	calcErrors = ( ) => { 

	}

	


	submitForm = (evt) => {
		evt.preventDefault();
		const avatarURI = this.state.avatarURI;
		var shouldSubmit = true;

		//Check no fields are empty
		for (var container in this.state) {
			if (container == "teamcategory") continue; //Optional field 
			if (this.state[container].value === '' || this.state[container].value === "") {
				shouldSubmit = false;
				this.setState({ [container]: { ...this.state[container], error: "Cannot be empty" } })
			}
		}

		if(!isEmail(this.state.email.value) && this.state.email.value !== "")
			this.setState( { email: { ...this.state.email, error: "Invalid Email address!"}})

		//Check passwords match
		if (this.state.password.value != this.state.passwordConfirm.value) {
			shouldSubmit = false;
			this.setState({
				password: { ...this.state.password, error: "The passwords do not match" },
				passwordConfirm: { ...this.state.passwordConfirm, error: "The passwords do not match" }
			})
		}

		if (shouldSubmit) {
			this.props.submitRegistration(
				this.state.email.value,
				this.state.password.value,
				this.state.firstname.value,
				this.state.lastname.value,
				this.state.teamname.value,
				this.state.teamdesc.value,
				this.state.teamcategory.value,
				this.state.avatarURI
			).then( (val) => { 
				
				if(val.payload.success) { 
					this.setState({success: true});
				} else { 
					//Errors when submitting
					console.log(val);
					this.handleErrors(val.payload.payload)
					
				}
			})
			this.clearErrors();
		}
	}

	clearErrors = () => {
		for (var container in this.state) {
			if(container != 'success' && container != "avatarURI")
			this.setState({ [container]: { ...this.state[container], error: "" } })
		}
	}

	handleErrors = (error) => {
		console.log(error);
		if (error)
			switch (error.name) {
				case "UserExistsError":
					this.setState({ email: { ...this.state.email, error: error.message } })
					break;
				default:
					console.log("Unknown Error");
			}
	}

	render() {
		console.log(this.state);
		if (this.state.success)
			return <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
				<h1> Thanks for Joining </h1>
				<p> We just need to confirm your email, in the future. So right now, you can login.  </p>
			</div>

		return (
			<div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
				<LoggedInRedirector />
				<form onSubmit={this.submitForm}>
					<h2> Your Details </h2>
					<Input type='text' name='email' label='Email' value={this.state.email.value} error={this.state.email.error} onChange={this.handleChange.bind(this, "email")} />
					<Input type='password' name='password' label='Password' value={this.state.password.value} error={this.state.password.error} onChange={this.handleChange.bind(this, "password")} />
					<Input type='password' name='passwordConfirm' label="Confirm Password" value={this.state.passwordConfirm.value}
						onChange={this.handleChange.bind(this, "passwordConfirm")} error={this.state.passwordConfirm.error}
					/>
					<Input type='text' name='firstname' label="First Name" value={this.state.firstname.value} error={this.state.firstname.error} onChange={this.handleChange.bind(this, "firstname")} />
					<Input type='text' name='lastname' label="Last Name" value={this.state.lastname.value} error={this.state.lastname.error} onChange={this.handleChange.bind(this, "lastname")} />
					<AvatarSelection
						image={this.state.avatarURI}
						setURI={(uri) => this.setState({ avatarURI: uri })}
						name={this.state.firstname.value}
					/>
					<h2> Team Details </h2>
					<Input type='text' name='teamname' label='Team Name' value={this.state.teamname.value} error={this.state.teamname.error} onChange={this.handleChange.bind(this, "teamname")} />
					<Input type='text' name='teamdesc' label='Team Description' value={this.state.teamdesc.value} error={this.state.teamdesc.error} onChange={this.handleChange.bind(this, "teamdesc")} />
					<Autocomplete
						type='text'
						name='teamcategory'
						label="Category"
						value={this.state.teamcategory.value}
						direction='down'
						multiple={false}
						source={categories}
						onChange={this.handleChange.bind(this, "teamcategory")}
					/>
					<input type='submit' style={{display: 'none'}} onSubmit={this.submitForm}/>
					<Button id='submitBtn' label='Submit' raised primary onClick={this.submitForm} />
				</form>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		errorMsg: state.ui.registrationFail,
		success: state.ui.registrationSuccess
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		submitRegistration: (username, password, firstName, lastName, teamName, description, category, avatar) => {
			return dispatch(register(username, password, firstName, lastName, teamName, description, category, avatar))
		}
	}
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer));
