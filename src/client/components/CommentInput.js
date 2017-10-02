import React from "react";
import Input from 'react-toolbox/lib/input';
import Checkbox from "react-toolbox/lib/checkbox";
import Autocomplete from 'react-toolbox/lib/autocomplete';

/**
 * Component that renders a form for inputting resource links
 */
const source = {
    hello:  { username: 'erow' },
    user:  { username: 'jsomma121' }
  };

export default class CommentComponent extends React.Component {
    state = {
        countries: ['ES-es', 'TH-th'],
        user: this.props.user,
      }
    
      handleChange = (value) => {
          console.log('value', value);
        this.setState({countries: value});
      };

    
      render () {
        return (
            <div>
                <Input type='text' label='Comment' name='comment' value={this.props.comments == '@' ? '@' + source.user.username : this.props.comments} onChange={(val) => this.props.handleChange(val, "comments")} />
                    
            </div>
        );
    }
}