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
                <CardText>
                    {this.props.text}
                    {this.props.tags.map((val, i) => <p key={i}>{val}</p>)}
                </CardText>
                <CardActions>
                    <Button flat icon='open_in_browser' label="Open" onClick={this.props.openFunc} />
                    <Button flat label="Comment" onClick={this.props.commentFunc} />
                    {this.props.showDelete &&
                        <Button icon="delete" accent label='delete' onClick={this.props.removeFunc} />
                    }
                </CardActions>

            </Card>
        )
    }

    onClick = (evt) => {
        window.open(
            this.props.url.includes("http://") || this.props.url.includes('https://')
                ? this.props.url
                : "https://" + this.props.url
        )
        //We should probably validate urls more so thatn we currently do 
        //Also yeah this doesn't really work well.
    }
}
