import React from "react";

import Input from 'react-toolbox/lib/input';


/**
 * Component that renders a form for inputting resource links
 */
export default class ResourceForm extends React.PureComponent {
    render() {
        return (
            <section>
                <Input type='text' label='URL' name='url' value={this.props.url} onChange={(val) => this.props.handleChange(val, "url")} />
                <Input type='text' label='Title' name='title' value={this.props.title} onChange={(val) => this.props.handleChange(val, "title")} />
                <Input type='text' label='Description' name='description' value={this.props.description} onChange={(val) => this.props.handleChange(val, "description")} />
                <Input type='text' label="Team ID" name='teamID' value={this.props.teamID} onChange={(val) => this.props.handleChange(val, "teamID")}/>
            </section>
        )   
    }
}