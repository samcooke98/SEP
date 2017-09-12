import React from "react";

import Input from 'react-toolbox/lib/input';
import Checkbox from "react-toolbox/lib/checkbox";

/**
 * Component that renders a form for inputting resource links
 */
export default class ResourceForm extends React.Component {
    render() {
        return (
            <section>
                <Input type='text' label='URL' name='url' value={this.props.url} onChange={(val) => this.props.handleChange(val, "url")} />
                <Input type='text' label='Title' name='title' value={this.props.title} onChange={(val) => this.props.handleChange(val, "title")} />
                <Input type='text' label='Description' name='description' value={this.props.description} onChange={(val) => this.props.handleChange(val, "description")} />
                
                { 
                    this.props.teams && this.props.teams.map( (val, index) => (
                        <Checkbox 
                            checked={val.checked}
                            label={val.teamName} 
                            name={val._id}
                            onChange={(result) => this.props.handleChange(result, index, true)} 
                            key={val._id}
                        />
                    ))
                }
            </section>
        )   
    }
}