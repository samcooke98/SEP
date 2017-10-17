import React from "react";

import Input from 'react-toolbox/lib/input';
import Checkbox from "react-toolbox/lib/checkbox";
import TagsInput from 'react-tagsinput'
import styles from 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import { Dialog, Button } from 'react-toolbox';
import isURL from "validator/lib/isURL"
/**
 * Component that renders a form for inputting resource links
 */
export default class ResourceForm extends React.Component {

    constructor(props)  { 
        super(props);
        this.state = {
            err: ''
        };
    }

    submit = (evt) => { 
        if(this.props.url === '') { 
            evt.preventDefault();
            this.setState({err: "Cannot be empty!"})
        } else if( !isURL(this.props.url ) ) {
            evt.preventDefault();
            this.setState({err: "Oops! This doesn't look like a valid URL"})
        } else { 
            this.setState({err: ""})
            this.props.submit(evt)
        }
    }

    render() {
        return (
            <Dialog
                active={this.props.active}
                onEscKeyDown={this.props.toggleDialog}
                onOverlayClick={this.props.toggleDialog}
                title='Add new entry'
            >
                <form onSubmit={this.submit}>
                    <Input type='text' label='URL' name='url' error={this.state.err} value={this.props.url} onChange={(val) => this.props.handleChange(val, "url")} />
                    <Input type='text' label='Title' name='title' value={this.props.title} onChange={(val) => this.props.handleChange(val, "title")} />
                    <TagsInput className={styles['react-tagsinput']}
                        value={this.props.tags} onChange={(val) => this.props.handleChange(val, "tags")} tagProps={
                            {
                                className: styles['react-tagsinput-tag'],
                                classNameRemove: styles['react-tagsinput-remove']
                            }}
                        focusedClassName={styles['react-tagsinput--focused']}
                        inputProps={
                            {
                                className: styles['react-tagsinput-input'],
                                placeholder: 'Add a tag'
                            }
                        }
                    />
                    <Input type='text' label='Description' name='description' value={this.props.description} onChange={(val) => this.props.handleChange(val, "description")} />

                    {
                        this.props.teams && this.props.teams.map((val, index) => (
                            <Checkbox
                                checked={val.checked}
                                label={val.teamName}
                                name={val._id}
                                onChange={(result) => this.props.handleChange(result, index, true)}
                                key={val._id}
                            />
                        ))
                    }
                    <input type='submit' style={{ display: 'none' }} />
                    <Button label='submit' primary onClick={this.submit} />
                </form>
            </Dialog>
        )
    }
}