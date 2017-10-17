import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { withProtection } from "./Protector.js";
import { Avatar, ListItem, List } from "react-toolbox";
import moment from 'moment';

import Container from "../components/Container.js";
import { getUserById } from "../redux/actions.js";
import { Switch} from "react-toolbox";
import { post, del } from "../utils/api"

//TODO: 
/* We should distinguish between read and unread notificaitons */
class NotificationContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            canEnable: false,
            isEnabled: false
        }
    }

    componentDidMount() {
        this.props.neededUsers.map((id) => {
            if (this.props.users[id].loaded === false) {
                const promise = this.props.getUser(id);
            }
        })

        this.setState({
            canEnable: window.Worker,
        })

        navigator.serviceWorker.getRegistrations().then((registrations) => {
            if (registrations) {
                for (var registration of registrations) {
                    if (registration.active) {
                        this.setState({ isEnabled: true })
                    }
                }
            }
        })
    }

    toggleNotifications = ( ) => { 
        this.state.isEnabled 
        ? this.removePushNotifications()
        : this.enablePushNotifications()
    }


    render() {
        console.log(this.props);
        console.log(this.state.isEnabled)
        return (
            <Container>
                <div>
                    <h1> Notifications </h1>
                    {this.state.canEnable && 
                        <Switch 
                            label="Push Notifications"
                            checked={this.state.isEnabled}
                            onChange={this.toggleNotifications}
                        />
                    }
                </div>
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


    removePushNotifications = () => {
        // removeWorkers(); 
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
                registration.pushManager.getSubscription().then((val) => {
                    console.log(val.endpoint)
                    del(`user/notify?endpoint=${encodeURIComponent(val.endpoint)}`)
                });
                registration.unregister()
            }
        })
        //TODO: We should tell the server that we removed a notification, but we'd have to get the subscription first 
        this.setState({ isEnabled: false })
    }

    enablePushNotifications = () => {
        navigator.serviceWorker.getRegistrations().then((val) => console.log(val))
        //TODO: Check it doesn't already exists
        if (window.Worker) {
            navigator.serviceWorker.register('./notification.js').then(
                (registration) => {
                    return registration.pushManager.getSubscription().then((subscription) => {
                        if (subscription) return subscription;
                        return registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array('BGEPmzJYZExIHNtzZg7k1srPMO0QLL7mg72W9WhgM4peX5U85-LvDGUorbKLmLXdylX1lsPiy2-gnfRV1pLwabI') })
                    }) // - private key
                }).then((subscription) => {
                    console.log(subscription)
                    console.log(JSON.stringify(subscription))
                    //Tell the server about our endpointt   
                    //For now, I'm not going through the Redux Store - In current scope, I don't see any other component\container needing to know if notifications are enabled or not. 
                    post(`user/notify`, subscription).then((response) => {
                        console.log(response);
                        response.success ? this.setState({ isEnabled: true }) : this.setState({ error: response.payload })
                    })
                })
        }
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

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}