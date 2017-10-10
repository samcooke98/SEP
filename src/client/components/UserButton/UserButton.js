import React from "react";
import Avatar from 'react-toolbox/lib/avatar';
import { Button } from 'react-toolbox/lib/button';
import { IconMenu, MenuItem, MenuDivider, Menu } from 'react-toolbox/lib/menu';
import Theme from "./User.css"


const defaultProps = {
    onClick: () => { },
    avatar: "https://placeimg.com/80/80/animals",
    name: "Sam Cooke"
}

//This will evolve into a button, that toggles a drop-down, that shows Logout, and Settings 
class UserView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }

    render() {
        const { props } = this;
        console.log(props);
        console.log(this.state);
        return (
            <Button
                style={{ height: "52px" }}
                onClick={(evt) => {
                    this.props.onClick && this.props.onClick(evt)
                    console.log(evt)
                    this.setState({ active: !this.state.active })
                }
                }
            >
                <div style={{
                    display: 'flex', flexDirection: 'row',
                    alignItems: 'center', height: "52px", boxSizing: 'border-box',
                    padding: '2px'
                }}>
                    <Avatar
                        image={props.avatar}
                        title={props.name}

                    />
                    <p style={{ marginLeft: "5px", color: "#F8F8F8" }}> {props.name} </p>
                </div>
                <Menu
                    active={this.state.active} position='auto'
                    style={{ position: 'relative !important' }}
                    theme={Theme}
                    onHide={() => this.setState({ active: false })}
                >
                    {this.props.children}
                </Menu>
            </Button >
        )
    }
}

UserView.defaultProps = defaultProps;

export default UserView;