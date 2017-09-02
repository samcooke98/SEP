/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserDetails } from "../redux/actions.js";

class FeedView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.details === undefined)  {
            this.props.getUser();
            return <div />
        } else {
            //Ideally, these would be all componenets, and this would have no control on the visuals
            console.log(this.props.details)
            return (
                <div>
                    This is your feed <br />
                    <h3> Teams </h3>
                    {
                        this.props.details.teams.map((value) => {
                            return <div> 
                                <h4>{value.teamName}</h4>
                                <Link to={`/createinvite/${value._id}`}>Create Invite</Link>
                            </div> 
                        })
                    }
                </div>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        details: state.userDetails
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUserDetails())
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedView));
