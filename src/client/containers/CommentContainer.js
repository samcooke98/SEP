/*
* Container for Requesting a Passowrd Reset
* Uses internal state only, althoguh it does connect to redux, just in case.
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CommentInput from "../components/CommentInput.js";
import { getUserDetails, createComment } from "../redux/actions.js";

import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Avatar from 'react-toolbox/lib/avatar'
import Input from 'react-toolbox/lib/input';
import Button from "react-toolbox/lib/button";

class CommentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceId: this.props.match.params.resourceId,
            userId: '',
            comments: '',
        }
    }

    submitForm = (evt) => {
        //Map the Teams that the user belongs to (Just in case there is more stored locally for some reason)
        let teams = this.props.user.teams.map((val) => this.props.teams[val]);
        //Create a property to hold if the team is checked or not
        teams = teams.map((val) => (val.checked = false, val))

        teams.forEach((val) => 
            this.props.createComment(this.state.resourceId, this.props.user._id, this.state.comments),
        );

    };

    handleChange = (value, name, isTeam) => {
        this.setState({ [name]: value })
   
    }
    

    render() {
        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                    <h1>Comments</h1>
                    <List selectable ripple>
                        <ListItem
                        avatar='https://dl.dropboxusercontent.com/u/2247264/assets/m.jpg'
                        caption='Dr. Manhattan'
                        legend="Jonathan 'Jon' Osterman"
                        rightIcon='star'
                        />
                        <ListItem
                        avatar='https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg'
                        caption='Ozymandias'
                        legend='Adrian Veidt'
                        rightIcon='star'
                        />
                        <ListItem
                        avatar='https://dl.dropboxusercontent.com/u/2247264/assets/r.jpg'
                        caption='Rorschach'
                        legend='Walter Joseph Kovacs'
                        rightIcon='star'
                        />
                    </List>
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
    var user = state.data.users[state.misc.userID]; //Gets the User Object
    return {
        user: user,
        teams: state.data.teams,
        comments: state.data.comments || {},
        resource: state.data.resources || {},
    }
}

//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUserDetails()),
        createComment: (resourceId, userId, comment) => dispatch(createComment(resourceId, userId, comment)),
        getComments: (resourceId) => dispatch(getComments(resourceId)),  
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentContainer));
