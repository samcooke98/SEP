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
                    image={this.props.img}
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
                  {/*<Button flat icon='open_in_browser' label="Open" onClick={this.props.openFunc} />*/}
                    <Button flat icon='open_in_browser' label="Open" onClick={this.onClick} />
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
