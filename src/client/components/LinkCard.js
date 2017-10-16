import React from "react";

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox';
import { Chip } from "react-toolbox";
import { Button } from 'react-toolbox/lib/button';

import styles from "./LinkCard.css";

export default class LinkCard extends React.PureComponent {
    render() {
        return (
            <Card style={{ width: '350px', margin: '1rem', height: '450px'}}>
                <CardMedia
                    aspectRatio='wide'
                    image={this.props.imgURL}
                />
                <CardTitle
                    title={this.props.title}
                    //subtitle={this.props.subtitle}
                >
                    {this.props.tags.map( (val, i) => <Chip className={styles.chip}>{val}</Chip> )}
                </CardTitle>
                <CardText>
                    {this.props.text}
                </CardText>
                <CardActions className={styles.cardFooter}>
                    <Button flat icon='open_in_browser' label="Open" onClick={this.openFunc} />
                    <Button flat label="Comment" onClick={this.props.commentFunc} />
                    <Button icon="delete" accent label='delete' onClick={this.props.removeFunc} />
                </CardActions>

            </Card>
        )
    }

    comment = (evt) => {
        open(this.props.url.concat('/comments'));
    }

    onClick = (evt) => {
        open(this.props.url)
    }

    delete = () => {
        console.log("TODO");
    }
}
