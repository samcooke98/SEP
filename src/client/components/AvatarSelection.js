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

    onButtonClick = (evt, val) => {
        // const target = evt.target.value;
        console.log(val);
        console.log(evt);
        // this.setState({active: val})
        this.props.onChange(val);

    }

    calcSignature = () => {
        const file = document.getElementById("file-input").files[0]
        fetch(`/api/sign-s3?file-name=${encodeURIComponent(file.name)}&file-type=${encodeURIComponent(file.type)}`).then((resp) => resp.json()).then(
            (json) => {
                if (!json.error)
                    this.uploadFile(file, json.signedRequest, json.url)
            }
        )
    }

    uploadFile = (file, signedRequest, url) => {

        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.props.setURI(url)
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        this.calcSignature();
    }

    render() {
        return (
            <div>
                {
                    avatars.map((val, i) => {
                        return (
                            <IconButton key={i} onClick={(evt) => this.onButtonClick.bind(this, evt, val)()} style={{ margin: '8px' }}>
                                <Avatar image={val} style={
                                    this.props.selected == val ? { border: "2px solid blue" } : {}
                                } />
                            </IconButton>
                        )
                    })
                }
                <Avatar image={this.props.URI} title={this.props.name || ""} />
                <input id='file-input' type='file' />
                <button onClick={this.onSubmit}> Upload </button>
            </div>
        )
    }
}

export default AvatarSelection;