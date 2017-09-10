/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Layout } from "react-toolbox/lib/layout";

import { RouteWithSubRoutes } from "../Routes.js";
import { AppBar, Panel, NavDrawer } from 'react-toolbox';
import { List, ListItem } from "react-toolbox";
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/link';



class BaseContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        console.log(this.props.routes);
        //Ideally, these would be all components, and this would have no control on the visuals
        return (

            <Layout>
                <AppBar leftIcon='menu' fixed flat />

                <NavDrawer pinned active clipped permanentAt='sm'>
                    <Navigation type='vertical'>
                        <List selectable ripple>
{/*We shouldn't be using the Link Component, we should be using the react router link component */}
                            <Link href='/login' label="Login" />
                            <Link href='/register' label="Register" />
                            <Link href='/feed' label="Feed" />
                        </List>

                    </Navigation>
                </NavDrawer>
                <Panel>
                    {this.props.routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Panel>
            </Layout>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseContainer));
