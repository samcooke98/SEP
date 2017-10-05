import React from "react";
import Input from 'react-toolbox/lib/input';
import Checkbox from "react-toolbox/lib/checkbox";
import Autocomplete from 'react-toolbox/lib/autocomplete';

/**
 * Component that renders a form for inputting resource links
 */


export default class CommentInput extends React.Component {
state = {
    simple: 'Spain',
    multiple: ['ES-es', 'TH-th']
};
      handleChange = (value) => {
            console.log(value);  
      };

      render () {
          console.log(this.props)
            return (
                <div>
                   
                    <Input 
                        type='text' 
                        label='Comment' 
                        name='comment' 
                        onChange={(val) => this.handleChange(val, "comments")} 
                        source={  this.props.users && this.props.users.map( (val) =>  val.firstName +  " " + val.lastName ) 
                            
                        }
                        />
                        
                </div>
            );
    }
}