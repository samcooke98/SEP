/*
Dialog to invite users to a team
*/
import React from "react";

import { Dialog, Input, Button } from "react-toolbox";

export default class InviteDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            value: '',
        }
    }
    // TODO-Fix email validation
    render() {
        return (
            <Dialog
                active={this.props.active}
                onOverlayClick={this.props.close}
                onEscKeyDown={this.props.close}
            >
                <h2> Invite Users via Email </h2>
                <p> Currently you can only add users via email. Please enter the email addresses below </p>
                <Input 
                    label="Emails: (john@smith.com; sally@peach.com)" 
                    name='email' 
                    error={this.props.error} 
                    onChange={this.props.handleChange} 
                    value={this.props.value} 
                /> <br />

                <Button name="sendInvite" icon="email" label="Send Invitations" onClick={this.props.onClick}/>
            </Dialog>
        )
    }
}
