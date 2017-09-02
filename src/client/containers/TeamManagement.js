/*
* TeamManagement - For now, creation of invitations 
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { sendInvitations } from "../redux/actions.js";

class TeamManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    submitForm = (evt) => {
        this.props.send(
            this.props.match.params.id, 
            this.state.value
        )
    }

    handleChange = (evt) => { 
        this.setState({value: evt.target.value })
    }

    render() {
        let teamID = this.props.match.params.id;
        //Ideally, these would be all componenets, and this would have no control on the visuals
        return (
            <div>
                <h2> Creating invitation for team: </h2>
                <textarea rows='4' cols='50' onChange={this.handleChange} value={this.state.value} /> <br />
                <button onClick={this.submitForm}> Send invites </button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {

    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        send: (id, emails) => dispatch(sendInvitations(id, emails))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamManagement));
