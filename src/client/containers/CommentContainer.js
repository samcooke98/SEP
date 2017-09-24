/*
* Container for Requesting a Passowrd Reset
* Uses internal state only, althoguh it does connect to redux, just in case.
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { comment } from "../redux/actions.js";
import CommentInput from "../components/CommentInput.js";
import lodash from "lodash";
import { getUserDetails, createComment, getComments } from "../redux/actions.js";


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
        //Map the Teams that the user belongs to (Just in case there is more stored locally for some reason)
        let teams = this.props.user.teams.map((val) => this.props.teams[val]);
        //Create a property to hold if the team is checked or not
        teams = teams.map((val) => (val.checked = false, val))
        
        teams.forEach((val) => 
            this.props.createComment(this.props.user._id, this.state.comments, val._id),
            teams.forEach((val) => this.props.getComments(val._id))
        );
        console.log(this.props.commentsIDs);
               

    };

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
                    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: "wrap", flex: 1, flexDirection: 'row' }}>
                    </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    var user = state.data.users[state.misc.userID]; //Gets the User Object
    return {
        user: user,
        teams: state.data.teams,
        comments: state.data.comments || {},
        commentsIDs: state.ui.comments || []
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUserDetails()),
        createComment: (userId, comment, teamId) => dispatch(createComment(userId, comment, teamId)),
        getComments: (teamId) => dispatch(getComments(teamId)),
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentContainer));
