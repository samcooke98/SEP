/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {resetPass} from "../redux/actions.js";

class ResetContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChange = (evt) => { 
        this.setState({email: evt.target.value})
    }

    submitForm = (evt) => { 
        evt.preventDefault();

        this.props.resetPass(this.state.email);
    }

    render() {
        return (
            <div>
                Enter your registered email: <br/>
                <form>
                <input type='text' name='email' value={this.state.email} onChange={this.handleChange}/> 
                <input type='submit' name='submit' onClick={this.submitForm}/>
                </form>
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
        resetPass: (email) => dispatch(resetPass(email))

    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetContainer));
