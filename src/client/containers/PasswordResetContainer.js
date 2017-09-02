/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {resetPassConfirm} from "../redux/actions.js";

class PasswordResetContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({ [name]: value })
    }

    submitForm = (evt) => { 
        evt.preventDefault();

        this.props.submit(this.state.password,this.props.match.params.id)
    }

    render() {
        return (
            <div>
                New password: <br />
                <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
                <br /><br />
                <input type='password' name='passwordconfirm' value={this.state.passwordconfirm} onChange={this.handleChange} />
                <br/>
                <input type='submit' onClick={this.submitForm}/>
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
        submit: (password, id) => dispatch( resetPassConfirm(password, id) )
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordResetContainer));
