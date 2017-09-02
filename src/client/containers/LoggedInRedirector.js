/*
* Helper Component that connects to state, and redirects if a user is logged in. 
*/
import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";


class FooterContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //Ideally, these would be all componenets, and this would have no control on the visuals
        if(this.props.loggedIn) 
            return <Redirect to={this.props.to || "/feed"}/> 
        else 
            return null; 
    }
}


const mapStateToProps = (state) => {
    console.log(state)
    return {
        loggedIn: state.loggedIn
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterContainer));
