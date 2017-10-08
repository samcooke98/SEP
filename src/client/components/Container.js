import React from "react";

export default (props) => { 
    return (
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
            {props.children}
        </div>
    )
}