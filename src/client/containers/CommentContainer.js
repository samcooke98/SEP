/*
* Container for Requesting a Passowrd Reset
* Uses internal state only, althoguh it does connect to redux, just in case.
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CommentInput from "../components/CommentInput.js";
import { getUserDetails, getUsersInTeam, createComment, getResource } from "../redux/actions.js";
import { withProtection } from "./Protector.js";

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
            teams: [],
            usersInTeam: null,
        }
    }

    submitForm = (evt) => {
        //Map the Teams that the user belongs to (Just in case there is more stored locally for some reason)
        
            this.props.createComment(this.state.resourceId, this.props.user._id, this.state.comments);
            this.setState({submitted: true});
            this.setState({commments: ''});

    };
    
    componentWillReceiveProps(nextProps) { 
        if(nextProps.comments != this.props.comments && this.state.submitted) { 
            //Comments have changed
            this.props.getResource(this.props.match.params.resourceId);
            this.setState({submitted: false});

        }
    }
    

    componentDidMount() {
        if(this.props.resource != {}) { 
            this.props.getResource(this.props.match.params.resourceId) 
        }
       
    }

    handleChange = (value, name) => {
        if(value == '@'){
            
        }
        this.setState({ [name]: value })
   
    }

    componentWillReceiveProps( nextProps ) { 
        if(nextProps.usersInTeam != this.props.usersInTeam) 
            this.setState({usersInTeam: nextProps.usersInTeam})



        if(!this.props.usersInTeam)
            if(!nextProps.usersInTeam)
                if(this.props.team || nextProps.team) {
                    console.log("GETTING TEAM")
                    this.props.getUsersInTeam( (this.props || nextProps) .team._id ) 
                }
        
        // if(nextProps.usersInTeam)nextProps.team )&& !(this.props || nextProps).usersInTeam) 
    }
    

    render() {
        console.log(this.props.usersInTeam);
        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                    <h2>Comments</h2>
                    <List selectable ripple>
                        {this.props.resource && this.props.resource.comments.map( (id) => {
                            return <ListItem 
                                avatar='https://dl.dropboxusercontent.com/u/2247264/assets/m.jpg'
                                caption={this.props.comments && this.props.comments[id].comment}
                                legend={this.props.user.firstName + ' ' + this.props.user.lastName}
                                rightIcon='delete'
                                
                            />
                        })}
                    </List>
                    <CommentInput
                        user={this.props.user}
                        comments={this.state.comments}
                        users={this.props.usersInTeam && this.props.usersInTeam.map((val) =>  (this.props.allUsers[val])
                        
                        )}
                        handleChange={this.handleChange}
                    />
                    <Button label='Comment' raised primary onMouseUp={this.submitForm}/>
                    
            </div>
        )
    }
}




const mapStateToProps = (state, ownProps) => {
    var user = state.data.users[state.misc.userID]; //Gets the User Object
    const resourceID = ownProps.match.params.resourceId; 

    return {
        user: user,
        teams: state.data.teams,
        allUsers: state.data.users,
        usersInTeam: state.ui.userInTeam,
        comments: state.data.comments || {},
        resource: state.data.resources && state.data.resources[ownProps.match.params.resourceId] || null,
        team: state.data.teams && state.data.resources && state.data.teams[state.data.resources[resourceID].team]
    }
}

//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUserDetails()),
        getUsersInTeam: (teamId) => dispatch(getUsersInTeam(teamId)),
        createComment: (resourceId, userId, comments) => dispatch(createComment(resourceId, userId, comments)),
        getResource: (resourceId) => dispatch(getResource(resourceId)),
        getComments: (resourceId) => dispatch(getComments(resourceId))  
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withProtection(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentContainer))
);
