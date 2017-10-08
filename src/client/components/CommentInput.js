import React from "react";
import {Checkbox, Input, Link, Chip, Autocomplete, Avatar}  from "react-toolbox/lib";

/**
 * Component that renders a form for inputting resource links
 */
// const countriesObject = {'ES-es': 'Spain', 'TH-th': 'Thailand', 'EN-gb': 'England', 'EN-en': 'USA'};

export default class CommentInput extends React.Component {
        // state = {
        //     userTagged: null,
        // };
      handleChange = (value) => {
        
      };

      handleMultipleChange = (value) => {
        this.setState({multiple: value});
      };

      handleUserTag(user) {
        event.preventDefault();

          
      }

      render () {
          console.log(this.props.taggedUsers)
            return (
                <div>
                    {
                        this.props.users != null && this.props.taggedUsers == []
                        ? this.props.users && this.props.users.map( (val, i) =>
                            this.props.taggedUsers.map((user, i) => {
                                conosle.log(user);
                                <div>
                                    <Link active onClick={this.handleUserTag}>
                                        <Chip>
                                            <Avatar title="A" /><span>{user[i]}</span>
                                        </Chip>
                                    </Link>
                                    <Input
                                        type='text' 
                                        label='Comment' 
                                        name='comment' 
                                        onChange={(val) => this.props.handleChange(val)}
                                        value={user[i]}    
                                    />
                                </div>
                            })
                        )
                        : 
                            <Input
                                type='text' 
                                label='Comment' 
                                name='comment' 
                                onChange={(val) => this.props.handleChange(val)}    
                                
                            />
                    }
                    
                        
                </div>
            );
    }
}