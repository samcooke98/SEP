/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


class FooterContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //Ideally, these would be all componenets, and this would have no control on the visuals
        return (
            <div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterContainer));
