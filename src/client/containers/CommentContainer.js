/*
* Container for Requesting a Passowrd Reset
* Uses internal state only, althoguh it does connect to redux, just in case.
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { comment } from "../redux/actions.js";
import CommentInput from "../components/CommentInput.js";
import { getUserDetails, createComment } from "../redux/actions.js";


import Avatar from 'react-toolbox/lib/avatar'
import Input from 'react-toolbox/lib/input';
import Button from "react-toolbox/lib/button";

class CommentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            comments: '',
            teams: []

        }
    }

    submitForm = (evt) => {
        console.log('hellloooo');
        // console.log(this.props.user._id);
        console.log(this.props.comments);
        console.log(this.props.teams);
        // this.props.createComment(this.props.user._id, this.state.comment, team._id);
        
    }

    handleChange = (value, name, isTeam) => {
        this.setState({ [name]: value })
   
    }

    render() {
        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                    <h1>Comments</h1>
                    <CommentInput
                        comment={this.state.comment}
                        handleChange={this.handleChange}
                    />
                    <Button label='Comment' raised primary onMouseUp={this.submitForm}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    var user = state.data.users[state.misc.userID];
    return {
        user: user,
        comments: state.data.comments,
        teams: state.data.teams
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUserDetails()),
        createComment: (userId, comment, teamId) => dispatch(createComment(userId, comment, teamId)),
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentContainer));
