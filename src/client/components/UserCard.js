import React from "react";

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';

const UserCard = (props) => {
    return (
        <Card style={{width: "400px"}}>
            <CardTitle 
                avatar={props.avatar}
                title={props.name}
                subtitle={'Nothing here yet'}
            />
            <CardActions>
                <Button label='Remove' onClick={props.onRemove}/>
                {/* <Button label='action 2'/> */}
            </CardActions>
        </Card>
    )
}

export default UserCard;
