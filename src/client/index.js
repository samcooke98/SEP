
import React from 'react';
import { render } from 'react-dom';


// TODO: Add React Hot Loader 
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./store.js";
import { Provider } from "react-redux";


const store = configureStore(window.__PRELOADED_STATE__);

const mountApp = document.getElementById('root-app');
console.log(store);
console.log(App);

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    mountApp);

if (module.hot) {
    console.log("here");
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <NextApp />
                </BrowserRouter>
            </Provider>,
            mountApp
        );
    });
}

if (window.Worker) {
    navigator.serviceWorker.register('./notification.js').then(
        (registration) => {
            return registration.pushManager.getSubscription().then((subscription) => {
                    return registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array('BGEPmzJYZExIHNtzZg7k1srPMO0QLL7mg72W9WhgM4peX5U85-LvDGUorbKLmLXdylX1lsPiy2-gnfRV1pLwabI') })
                }) // - private key
        }).then((subscription) => {
            console.log(subscription)
            console.log(JSON.stringify(subscription))
            var rawKey = subscription.getKey ? getKey('p256dh') : '';
            key = rawKey ?
                btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) :
                '';
            var rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
            authSecret = rawAuthSecret ?
                btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) :
                '';

            endpoint = subscription.endpoint;
            console.log(endpoint); console.log(key); console.log(authSecret);

        })
}

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