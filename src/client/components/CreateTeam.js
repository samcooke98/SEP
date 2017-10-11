import React from "react";

import { Dialog, Input } from "react-toolbox";




class CreateTeam extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teamDesc: { value: '', error: '' },
            teamName: { value: '', error: '' },
            error: ''
        }
    }

    handleChange = (name, value) => this.setState({ [name]: { value, error: '' } })

    createTeam = () => {
        this.props.createTeam(this.state.teamName.value, this.state.teamDesc.value).then(
            (val) => {
                if (val.error) {
                    this.setState({ error: "Something went wrong!" });
                } else {
                    if (val.payload.success) {
                        this.props.close(); //Maybe toggle some feedback to show it's going? 
                    } else {
                        //err handling section;
                        console.log(val.payload);
                        if (val.payload.payload.errors.teamName) {
                            this.setState({ teamName: { value: this.state.teamName.value, error: "Oops! Please check your team name" } });
                        }
                        if (val.payload.payload.errors.description) {
                            this.setState({ teamDesc: { value: this.state.teamDesc.value, error: "Oops! Please check your team description" } });
                        }
                    }
                }
                //err handling
            }
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active == false) {
            //Clear state
            this.setState({ teamName: '', teamDesc: '', error: '' })
        }
    }

    submit = (evt) => { 
        console.log(evt);
        evt.preventDefault();
        this.createTeam();
    }

    render() {
        const props = this.props;
        return (
            <Dialog
                actions={
                    [
                        { label: "Cancel", onClick: props.close },
                        { label: "Create", onClick: this.createTeam }
                    ]
                }
                active={props.active}
                onEscKeyDown={props.close}
                onOverlayClick={props.close}
            >
                <h3> Create a new Team </h3>
                {this.state.error !== '' && <p style={{ color: '#ff0000' }}> {this.state.error} </p>}
                <form onSubmit={this.submit} >
                    <Input name='teamName' label='Team Name' onChange={this.handleChange.bind(this, "teamName")} value={this.state.teamName.value} error={this.state.teamName.error} />
                    <Input name='teamDesc' label='Team Description' onChange={this.handleChange.bind(this, "teamDesc")} value={this.state.teamDesc.value} error={this.state.teamDesc.error} />
                    <input type='submit' style={{display: 'none'}} value='submit' onSubmit={ this.submit } />
                </form>
            </Dialog >
        )
    }
}

export default CreateTeam;