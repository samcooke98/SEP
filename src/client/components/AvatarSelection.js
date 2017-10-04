import React from 'react';

import Avatar from 'react-toolbox/lib/avatar';
import Button, { IconButton } from "react-toolbox/lib/button";


/*
Component that renders a bunch of avatars, and provides a parent with the active value

*/

const avatars = [
    "http://placeimg.com/80/80/animals?a",
    "http://placeimg.com/80/80/animals?c",
    "http://placeimg.com/80/80/animals?g",
    "http://placeimg.com/80/80/animals?e",
    "http://placeimg.com/80/80/people?f",
    "http://placeimg.com/80/80/people?h",
    "http://placeimg.com/80/80/people?b",
    "http://placeimg.com/80/80/people?d",
    
    
]


class AvatarSelection extends React.Component {
    constructor(props) { 
        super(props);
        
        this.state = { 
            active: undefined
        }
    }

    onButtonClick = (evt,val) => { 
        // const target = evt.target.value;
        console.log(val);
        console.log(evt);
        // this.setState({active: val})
        this.props.onChange(val);

    }

    render() {
        return (
            <div>
                {
                    avatars.map((val, i) => {
                        return (
                            <IconButton key={i} onClick={(evt) => this.onButtonClick.bind(this,evt, val)()} style={{ margin: '8px' }}>
                                <Avatar image={val } style={
                                    this.props.selected == val ? {border: "2px solid blue" } : {}
                                }  /> 
                            </IconButton>
                        )
                    })
                }
            </div>
        )
    }
}

export default AvatarSelection;