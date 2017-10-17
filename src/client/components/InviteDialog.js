/*
Dialog to invite users to a team
*/
import React from "react";

import { Dialog, Input, Button } from "react-toolbox";
import isEmail  from "validator/lib/isEmail"
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
                <form onSubmit={this.onSubmit}>
                    <Input
                        label="Emails: (john@smith.com; sally@peach.com)"
                        name='email'
                        error={this.state.error}
                        onChange={this.props.handleChange}
                        value={this.props.value}
                    /> <br />

                    <Button name="sendInvite" icon="email" label="Send Invitations" onClick={this.onSubmit} />
                </form>
            </Dialog>
        )
    }

    onSubmit = ( evt ) => { 
        evt.preventDefault();

        let canSubmit = true;
        const emails = this.props.value.split(';');
        for(var email of emails) { 
            console.log(email)
            if (!isEmail(email)) {
                canSubmit = false
                this.setState({error: "Looks like one of the emails isn't valid"})
            }
        }
        if(canSubmit) 
            this.props.onClick();
    }
}
