import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { withProtection } from "./Protector.js";
import { Avatar, ListItem, List } from "react-toolbox";
import moment from 'moment';

import Container from "../components/Container.js";
import { getUserById } from "../redux/actions.js";

//TODO: 
/* We should distinguish between read and unread notificaitons */
class NotificationContainer extends React.Component {

    componentDidMount() {
        this.props.neededUsers.map((id) => {
            if (this.props.users[id].loaded === false) {
                const promise = this.props.getUser(id);
            }
        })
    }

    render() {
        console.log(this.props);
        return (
            <Container>
                <h1> Notifications </h1>
                <List selectable='false' ripple={false}>
                    {this.props.notifications.map((obj) =>
                        <Notification
                            key={obj._id}
                            avatarTitle={this.props.users[obj.triggerPerson].firstName || ''}
                            avatarImg={this.props.users[obj.triggerPerson].avatarURI || ''}
                            time={obj.time}
                            description={obj.description}
                            onClick={() => window.open(obj.url)}  //TODO: eh, not the most elegant thing - should probably do something to mark it as clicked in the future.
                        />
                    ).reverse()}
                </List>
                {
                    this.props.notifications.length == 0 && 
                    <p> Looks like you don't have any notifications! Why not get started by <Link to="/feed"> posting some links? </Link> </p>
                }
            </Container>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const usersNeeded = state.data.users[state.misc.userID].notifications.map((obj) => obj.triggerPerson)
        .filter((item, i, ar) => ar.indexOf(item) === i) //Ensure each value appears once and once only 
    console.log(usersNeeded);
    return {
        notifications: state.data.users[state.misc.userID].notifications || [],

        neededUsers: usersNeeded,
        users: usersNeeded.reduce((accumulator, id) => { //Create an object from the ids of the array. 
            if (!accumulator[id])
                accumulator[id] = (state.data.users[id] || { _id: id, firstName: '', avatarURI: '', loaded: false })
            return accumulator;
        }, {})

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUser: (id) => dispatch(getUserById(id))
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
        selectable={true}
        onClick={props.onClick}
    />
    )
}