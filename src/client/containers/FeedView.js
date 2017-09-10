/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserDetails, createResource } from "../redux/actions.js";

import { Button, IconButton } from 'react-toolbox/lib/button';
import ResourceForm from "../components/ResourceForm.js";
import LinkCard from "../components/LinkCard.js";
import LoggedInRedirector from "./LoggedInRedirector"


class FeedView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        }
    }

    handleChange = (value, name) => { 
        this.setState({[name]: value})
    }

    submit = (evt) => { 
        console.log(this.props);
        this.props.createResource(this.state.url, this.state.title, this.state.description, this.state.teamID)
    }

    render() {
        
        if (this.props.details === undefined) {
            this.props.getUser();
            return <div />
        } else {
            return (
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                    <h1>Main Content</h1>
                    <p>Main content goes here.</p>
                    <ResourceForm 
                        url={this.state.url} 
                        title={this.state.title}
                        description={this.state.description}
                        teamID={this.state.teamID}
                        handleChange={this.handleChange}
                    />
                    <Button icon='add' floating onMouseUp={this.submit} />
                    {
                        (Object.entries(this.props.resources)).map( (index) => {
                            console.log(this.props.resources[index]);
                            return <LinkCard/>
                        })
                    }
                </div>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        details: state.userDetails,
        resources: state.resources || {},
        ui: state.ui.resources || {}
        // resources: (state.data || {}).resources
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUserDetails()),
        createResource: (url, title, description, team) => dispatch(createResource(url, title, description, team))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedView));
