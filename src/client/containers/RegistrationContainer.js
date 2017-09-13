/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../redux/actions.js"
import LoggedInRedirector from "./LoggedInRedirector.js";

import Input from 'react-toolbox/lib/input';
import Button from "react-toolbox/lib/button";
import Autocomplete from 'react-toolbox/lib/autocomplete';

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
			success: false
		}
	}

	handleChange = (name, value) => {
		this.setState({ [name]: { value, error: this.state[name].error } })
	}

	submitForm = (evt) => {
		evt.preventDefault();

		var shouldSubmit = true;

		//Check no fields are empty
		for (var container in this.state) {
			if (container == "teamcategory") continue; //Optional field 
			if (this.state[container].value === '' || this.state[container].value === "") {
				shouldSubmit = false;
				this.setState({ [container]: { ...this.state[container], error: "Cannot be empty" } })
			}

		}

		//TODO: Validate email
		// if(validateEmail(this.state.email) && this.state.email !== "")
		// 	this.setState( { email: { ...this.state.email, error: "Invalid Email address!"}})

		//Check passwords match
		if (this.state.password.value != this.state.passwordConfirm.value) {
			shouldSubmit = false;
			this.setState({
				password: { ...this.state.password, error: "The passwords do not match" },
				passwordConfirm: { ...this.state.passwordConfirm, error: "The passwords do not match" }
			})
		}
<<<<<<< HEAD

=======
		console.log(shouldSubmit);
>>>>>>> testing

		if (shouldSubmit) {
			this.props.submitRegistration(
				this.state.email.value,
				this.state.password.value,
				this.state.firstname.value,
				this.state.lastname.value,
				this.state.teamname.value,
				this.state.teamdesc.value,
				this.state.teamcategory.value
			)
			//Clear all errors
			for (var container in this.state) {
				this.setState({ [container]: { ...this.state[container], error: "" } })
			}
		}
	}

	clearErrors = () => {
		for (var container in this.state) {
			this.setState({ [container]: { ...this.state[container], error: "" } })
		}
	}

	handleErrors = (error) => {
		console.log(error);
		switch (error.name) {
			case "UserExistsError":
				this.setState({ email: { ...this.state.email, error: error.message } })
				break;
			default:
				console.log("Unknown Error");
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		console.log(this.props);
		if (nextProps.success && !this.props.success) {
			this.setState({ success: true })
			this.clearErrors();
		} else {
			this.setState({ success: false })
			this.handleErrors(nextProps.errorMsg)
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
				<form>
					<h2> Your Details </h2>
					<Input type='text' name='email' label='Email' value={this.state.email.value} error={this.state.email.error} onChange={this.handleChange.bind(this, "email")} />
					<Input type='password' name='password' label='Password' value={this.state.password.value} error={this.state.password.error} onChange={this.handleChange.bind(this, "password")} />
					<Input type='password' name='passwordConfirm' label="Confirm Password" value={this.state.passwordConfirm.value}
						onChange={this.handleChange.bind(this, "passwordConfirm")} error={this.state.passwordConfirm.error}
					/>
					<Input type='text' name='firstname' label="First Name" value={this.state.firstname.value} error={this.state.firstname.error} onChange={this.handleChange.bind(this, "firstname")} />
					<Input type='text' name='lastname' label="Last Name" value={this.state.lastname.value} error={this.state.lastname.error} onChange={this.handleChange.bind(this, "lastname")} />

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
					<Button label='Submit' raised primary onClick={this.submitForm} />
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
		submitRegistration: (username, password, firstName, lastName, teamName, description, category) => {
			dispatch(register(username, password, firstName, lastName, teamName, description, category))
		}
	}
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer));
