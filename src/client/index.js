
import React from 'react';
import { render } from 'react-dom';


// TODO: Add React Hot Loader 
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./store.js";
import { Provider } from "react-redux";

const store = configureStore(window.__INITIAL_STATE__);
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