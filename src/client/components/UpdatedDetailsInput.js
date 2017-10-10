import React from "react";
import Input from 'react-toolbox/lib/input';



export default class UpdatedDetailsInput extends React.Component {
    render() {
        return (
            <section>
                <Input type='text' label='Email' name='email' value={this.props.email} onChange={(val) => this.props.handleChange(val, "email")} />
                <Input type='text' label='First Name' name='firstName' value={this.props.firstName} onChange={(val) => this.props.handleChange(val, "firstName")} />
                <Input type='text' label='Last Name' name='lastName' value={this.props.lastName} onChange={(val) => this.props.handleChange(val, "lastName")} />
                <Input type='text' label='Old password' name='oldPassword' value={this.props.oldPassword} onChange={(val) => this.props.handleChange(val, "oldPassword")} />
                <Input type='text' label='New Password' name='newPassword' value={this.props.title} onChange={(val) => this.props.handleChange(val, "title")} />
                <Input type='text' label='Confirm New Password' name='confirmNewPassword' value={this.props.title} onChange={(val) => this.props.handleChange(val, "confirmNewPassword")} />
                
            </section>
        )   
    }
}