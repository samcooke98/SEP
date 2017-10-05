import React from "react";
import Input from 'react-toolbox/lib/input';
import Checkbox from "react-toolbox/lib/checkbox";

/**
 * Component that renders a form for inputting resource links
 */
export default class CommentComponent extends React.Component {
    render() {
        return (
            <section>
                <Input type='text' label='Comment' name='comment' value={this.props.comments} onChange={(val) => this.props.handleChange(val, "comments")} />
            </section>
        )   
    }
}