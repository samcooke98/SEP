import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withProtection } from "./Protector.js";
import { Avatar, ListItem, List } from "react-toolbox";
import moment from 'moment';

import Container from "../components/Container.js";
import { getUserDetails } from "../redux/actions.js";



class NotificationContainer extends React.Component {

    componentDidMount() { 
        this.props.users.forEach( (idOrObj) => { 
            console.log(typeof idOrObj )
            console.log(idOrObj);
            if(typeof idOrObj === "string") {
                console.log("Getting Object");
                this.props.getUser(idOrObj);
            }
        })
    }

    render() {
        console.log(this.props);
        return (
            <Container>
                <h1> Notifications </h1>
                <p> This page would display all your notifications </p>
                <List selectable='false' ripple={false}>
                    {this.props.notifications.map((obj) =>
                        <Notification
                            key={obj._id}
                            avatarTitle={"T"}
                            avatarImg={"T"}
                            time={obj.time}
                            description={obj.description}
                        />
                    )}
                </List>
            </Container>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const usersNeeded = state.data.users[state.misc.userID].notifications.map((obj) => obj.triggerPerson)
    return {
        notifications: state.data.users[state.misc.userID].notifications || [],
        users: usersNeeded.map( (id) => state.data.users[id] || id ) 
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUser: (id) => dispatch(getUserDetails(id))
    }
}

export default withProtection(withRouter(connect(mapStateToProps, mapDispatchToProps)(NotificationContainer)))


const Notification = (props) => {
    return (<ListItem
        avatar={<Avatar
            image={props.avatarImg}
            title={props.avatarTitle}
        />}
        caption={props.description}
        legend={moment.utc(props.time).fromNow()}
        ripple={false}
    />
    )
}