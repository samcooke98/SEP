import React from "react";

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
import {Avatar} from 'react-toolbox';

const UserCard = (props) => {
    return (
        <Card style={{width: "400px", margin: '1rem'}}>
            <CardTitle 
                avatar={<Avatar image={props.avatar} title={props.name}/> }
                title={props.name}
                subtitle={props.isTeamOwner ? "Team Owner" : "Team Member"}
            />
            <CardActions>
                {props.isTeamOwner ? null: 
                    <Button label='Remove' onClick={props.onRemove}/>                                
                }
                {/* <Button label='action 2'/> */}
            </CardActions>
        </Card>
    )
}

export default UserCard;
