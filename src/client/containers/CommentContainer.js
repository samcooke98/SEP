/*
* Container for Requesting a Passowrd Reset
* Uses internal state only, althoguh it does connect to redux, just in case.
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { comment } from "../redux/actions.js";
import CommentInput from "../components/CommentInput.js";

import Avatar from 'react-toolbox/lib/avatar'
import Input from 'react-toolbox/lib/input';
import Button from "react-toolbox/lib/button";

class CommentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',

        }
    }

    submit = (evt) => {

    }

    render() {
        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                    <h1>Comments</h1>
                    <Avatar><img src="https://placeimg.com/80/80/animals"/></Avatar>
                    <CommentInput
                        comment={this.state.comment}
                    />
                    <Button icon='add' floating onMouseUp={this.submit}/>
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
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentContainer));
