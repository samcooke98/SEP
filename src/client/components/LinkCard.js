import React from "react";

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button'

export default class LinkCard extends React.PureComponent {
    render() {
        return (
            <Card style={{ width: '350px', margin: '1rem' }}>
                <CardMedia
                    aspectRatio='wide'
                    image='https://placeimg.com/800/450/nature'
                />
                <CardTitle
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                />
                <CardText>{this.props.text}</CardText>
                <CardActions>
                    <Button flat label="Open" />
                    <Button flat label="Comment" onClick={this.props.commentFunc} />
                    <Button icon="delete" accent label='delete' onClick={this.props.removeFunc} /> 
                </CardActions>  

            </Card>
        )
    }

    delete = () => { 
        console.log("TODO");
    }
}
