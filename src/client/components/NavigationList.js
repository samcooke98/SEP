import React from "react";

import Navigation from 'react-toolbox/lib/navigation';
import { List, ListItem, ListDivider, ListSubHeader } from "react-toolbox/lib/list";
import {Link} from "react-router-dom"


const propTypes = { 
    teams: Array, //Of Team Objects
}

/**
 * This renders the navigation list on the left of the screen. 
 * Currently there are a few key aspects. There the first section, containing a Link to "/feed"
 * The next section is then generated based off props.teams, and renders a link in the left menu to just that team view.
 */
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
                                <NavigationLink to={`/team/${teamObj._id}`} display={teamObj.teamName} />
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