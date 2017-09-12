/*
* Container that connects to state, and redirects if a user is not logged in, otherwise renders the children 
*/
import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from 'react-toolbox/lib/input';


class Protector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //Ideally, these would be all components, and this would have no control on the visuals
        if (!this.props.loggedIn)
            return <Redirect to={"/login"} />
        else
            return this.props.children;
    }
}


const mapStateToProps = (state) => {
    console.log(state)
    return {
        loggedIn: state.misc.loggedIn
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Protector));


export function withProtection(WrappedComponent) {
    return withRouter(connect(mapStateToProps, mapDispatchToProps)
        (class extends React.Component {
            render() {
                if (!this.props.loggedIn)
                    return <Redirect to={"/login"} />
                else
                    return <WrappedComponent/>
            }
        }))

}

