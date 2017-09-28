/*
* Container for Requesting a Passowrd Reset
* Uses internal state only, althoguh it does connect to redux, just in case.
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CommentInput from "../components/CommentInput.js";
import { getUserDetails, createComment, getResource } from "../redux/actions.js";
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
        }
    }

    submitForm = (evt) => {
        //Map the Teams that the user belongs to (Just in case there is more stored locally for some reason)
        
            this.props.createComment(this.state.resourceId, this.props.user._id, this.state.comments)
            this.setState({submitted: true})

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

    handleChange = (value, name, isTeam) => {
        this.setState({ [name]: value })
   
    }
    

    render() {
        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                    <h1>Comments</h1>
                    <List selectable ripple>
                            return <p> {this.props.comments[id].comment}</p>
                        })}
                        
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




const mapStateToProps = (state, ownProps) => {
    var user = state.data.users[state.misc.userID]; //Gets the User Object
    return {
        user: user,
        teams: state.data.teams,
        comments: state.data.comments || {},
        resource: state.data.resources && state.data.resources[ownProps.match.params.resourceId] || null,
    }
}

//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUserDetails()),
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
