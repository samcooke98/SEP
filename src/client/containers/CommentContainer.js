/*
* Container for Requesting a Passowrd Reset
* Uses internal state only, althoguh it does connect to redux, just in case.
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CommentInput from "../components/CommentInput.js";
import { getUserDetails, getUserById, getUsers, createComment, getResource, deleteComment } from "../redux/actions.js";

import { withProtection } from "./Protector.js";

import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Avatar from 'react-toolbox/lib/avatar'
import Input from 'react-toolbox/lib/input';
import Button from "react-toolbox/lib/button";
import {IconButton, Chip} from "react-toolbox";



class CommentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            commentErr: '',
            resourceId: this.props.match.params.resourceId,
            userId: '',
            usersInTeam: null,
            taggedUsers: [], //An array of ids of people we have tagged. It is hacky but who cares?
        }
    }

    submitForm = (evt) => {
        evt.preventDefault();
        if(this.state.comment != '') { 
            this.setState({commentErr: ""});
            //Map the Teams that the user belongs to (Just in case there is more stored locally for some reason)
            this.props.createComment(this.props.user._id, this.state.comment, this.state.taggedUsers).then( (val) => { 
                console.log(val);
                this.props.getResource();
                if(val.payload.success) { 
                    this.setState({comment:''})
                }
            })
        } else { 
            this.setState({commentErr: "Cannot be empty!"});
            
        }   
    };


    componentDidMount() {
        if(!this.props.resource) 
            this.props.getResource()
    }

    componentWillReceiveProps(nextProps) { 
        nextProps.members.map( (idOrObj ) => { 
            if(typeof idOrObj == "string") { //It's an ID
                this.props.getUserById(idOrObj)
            } 
        })
    }

    handleChange = (value, name) => {
        this.setState({ [name]: value })
        if(value.endsWith("@") ){ 
            this.setState({isTagging: true}) 
        } else { 
            this.setState({isTagging: false}) 
        }

    }

    remove = (commentId) => {
        this.props.deleteComment( commentId);
    }

    render() {
        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                <h2>Comments</h2>
                <List selectable ripple>
                    {this.props.resource && this.props.resource.comments.map((id) => {
                        const user = this.props.users[this.props.comments[id].userId] || {};
                        let name;
                        if(user) {
                            name = user.firstName + ' ' + user.lastName
                        }
                        return <ListItem
                            key={id}
                            avatar={<Avatar image={user.avatarURI} title={name} />}
                            caption={this.props.comments && this.props.comments[id].comment}
                            legend={name}
                            rightActions={this.props.userIsOwner 
                            ?   [
                                    <IconButton key={1} icon='delete' onClick={()=> this.remove(id)} />
                                ] 
                            : []}

                        />
                    })}
                </List>
                <CommentInput
                    value={(this.state.comment)}
                    error={this.state.commentErr}
                    handleChange={this.handleChange}
                    onSubmit={this.submitForm}
                />
                {
                    this.state.isTagging && 
                     
                    this.props.members.map ( (user, counter) => { 
                        if( ( typeof user ) === "string") { 
                            this.props.getUserById(user);
                            return <p key={counter}> Loading... </p> 
                        } else {                         
                            console.log(user);
                            return (
                                <span onClick={() => {
                                    this.setState({taggedUsers: [...this.state.taggedUsers, user._id]})
                                    this.handleChange(`${this.state.comment}${user.firstName} ${user.lastName}`, 'comment')
                                }}>
                                    <Chip key={counter}> 
                                        {user.firstName} {user.lastName}
                                    </Chip>
                                </span>
                            )
                        }
                    })
                }<br/>

                <Button label='Comment' raised primary onMouseUp={this.submitForm} />

            </div>
        )
    }
}




const mapStateToProps = (state, ownProps) => {
    const user = state.data.users[state.misc.userID]; //Gets the User Object
    const resource = state.data.resources[ownProps.match.params.resourceId] || {}; 
    const team = state.data.teams[resource.team] || {};
    

    const resourceID = ownProps.match.params.resourceId;
    // const userIDs = state.data.
    return {
        user: user,
        userIsOwner: team.owner == user._id,
        users: state.data.users,
        members: team.members && team.members.map( id => state.data.users[id] || id ),
        comments: state.data.comments || {},
        resource: state.data.resources && state.data.resources[ownProps.match.params.resourceId] || null,
    }
}

//Typically would implement actions
const mapDispatchToProps = (dispatch, ownProps) => {
    const resourceID = ownProps.match.params.resourceId;
    return {
        getUser: () => dispatch(getUserDetails()),
        getUserById: (id) => dispatch( getUserById (id) ),
        getUsersInTeam: (teamId) => dispatch(getUsers(teamId)),
        createComment: (userId, comments, taggedUser) => dispatch(createComment(resourceID, userId, comments, taggedUser)),
        getResource: () => dispatch(getResource(resourceID)),
        deleteComment: ( commentId) => dispatch(deleteComment(resourceID, commentId))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withProtection(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentContainer))
);