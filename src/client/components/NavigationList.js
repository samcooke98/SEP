import React from "react";

import Navigation from 'react-toolbox/lib/navigation';
import { List, ListItem, ListDivider, ListSubHeader } from "react-toolbox/lib/List";
import {Link} from "react-router-dom"

export default (props) => {
    return (
        <Navigation type='vertical'>
            <List selectable ripple >
                <ListSubHeader caption="Main" />
                <ListItem
                    caption="Feed"
                />
                <ListItem
                    caption="Your Profile"
                />
                <ListDivider />
                <ListSubHeader caption="Teams" />
                {props.teams.map((teamObj) => {
                    return (
                        <ListItem
                            key={teamObj._id + "naviList"}
                            caption={teamObj.teamName}
                            itemContent={
                                <NavigationLink to="/hello" display={teamObj.teamName} />
                            }
                        />
                    )
                })}
               
            </List>
            {/* <footer> Hello </footer>  */}
        </Navigation>
    )
}

const NavigationLink = (props) => {
    return (
        <Link 
            to={props.to}
            style={{
                textDecoration: 'none',
                display: 'block',
                width: '100%', height: '100%'
            }}
        >
            {props.display}
        </Link>
    )

}