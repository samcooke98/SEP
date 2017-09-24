/*
* Settings Page - For now, enables notifications
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { sendInvitations } from "../redux/actions.js";
import { withProtection } from "./Protector.js";

import Button from "react-toolbox/lib/button";
import Input from "react-toolbox/lib/input";

import {post } from "../utils/api"


class SettingsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canHave: window.Worker, //Are service workers supported? If they are we *can have* Notifications
            hasSetup: false
        }
        navigator.serviceWorker.getRegistrations().then((val) => console.log(val))
    }

    componentDidMount() {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            if (registrations) {
                for (var registration of registrations) {
                    if (registration.active) {
                        this.setState({ hasSetup: true })
                    }
                }
            }
        })
    }

    removePushNotifications = () => { 
        removeWorkers(); 
        //TODO: We should tell the server that we removed a notification, but we'd have to get the subscription first 
        this.setState({hasSetup: false})
    }

    enablePushNotifications = () => {
        navigator.serviceWorker.getRegistrations().then((val) => console.log(val))
        //TODO: Check it doesn't already exists
        if (window.Worker) {
            navigator.serviceWorker.register('./notification.js').then(
                (registration) => {
                    return registration.pushManager.getSubscription().then((subscription) => {
                        return registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array('BGEPmzJYZExIHNtzZg7k1srPMO0QLL7mg72W9WhgM4peX5U85-LvDGUorbKLmLXdylX1lsPiy2-gnfRV1pLwabI') })
                    }) // - private key
                }).then((subscription) => {
                    console.log(subscription)
                    console.log(JSON.stringify(subscription))
                    //Tell the server about our endpointt
                    //For now, I'm not going through the Redux Store - In current scope, I don't see any other component\container needing to know if notifications are enabled or not. 
                    post(`user/notify`, subscription).then( (response) => { 
                        console.log(response);
                        response.success ? this.setState({hasSetup: true}) : this.setState({error: response.payload}) 
                    })
                })
        }
    }

    render() {
        //Ideally, these would be all components, and this would have no control on the visuals
        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                <h1> Settings </h1>
                <p> To {this.state.hasSetup ? "remove" : "enable"} notifications, click the button below </p>
                {/*If the browser supports it, and if we haven't already setup notificatins  */}
                {this.state.canHave && !this.state.hasSetup &&
                    <Button onClick={this.enablePushNotifications} label='Enable Notifications' primary raised />
                }
                {/* Let's be nice, and give them a way to remove push notifications to  */}
                {this.state.canHave && this.state.hasSetup &&
                    <Button onClick={this.removePushNotifications} label='Remove Notifications' primary raised />
                }
                {/* And if they don't support it, tell them as much */}
                {!this.state.canHave && 
                    <p> Oh dear, it looks like your browser doesn't support Push Notifications... </p> 
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    var user = state.data.users[state.misc.userID]; //Gets the User Object
    return {
        user: user,
        teams: state.data.teams,


    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        send: (id, emails) => dispatch(sendInvitations(id, emails))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withProtection(withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)));




function removeWorkers() {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
            registration.unregister()
        }
    })
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