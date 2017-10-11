import React from "react";
import renderer from "react-test-renderer";
import StaticRouter from "react-router-dom";
// import ReactDOM from 'react-dom';

import NotificationContainer from "../../containers/NotificationContainer";



//Probably want Enzyme at some point 

describe('React Component: Notification Container', () => {
    it("matches a snapshot", () => {
        const tree = renderer.create(
            <StaticRouter>
                <NotificationContainer />
            </StaticRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })


})