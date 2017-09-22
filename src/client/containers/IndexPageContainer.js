/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { StyleSheet, View, Text, Image } from "react-primitives" 



class IndexPageContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //Ideally, these would be all componenets, and this would have no control on the visuals
        return (
         <div style={stylesheet.bg}>
            <div style={stylesheet.container}> 
             <h1 style={stylesheet.titles}>TeamShare.</h1>
               <desc style={stylesheet.text}> Looking for a way to maximise collaboration and information sharing between members of your team? Look no further! TeamShare is an interactive and centralised platform aimed at facilitating resource sharing and collaboration in any team, giving you the ability to share articles and annotate for further discussion. </desc>          
               <div style={stylesheet.spacing}>
                <p style={stylesheet.spacing}> Already a member? Login to access your team! </p>
                 <Link to="/login" style={stylesheet.button}> Login </Link>
                 <br/>
                 <p style={stylesheet.spacing}> New to Teamshare? Register as a team leader here! </p>
                 <Link to="/register" style={stylesheet.button}> Register </Link> 
                </div >
            </div> 
         </div>
        )
    }
}

const stylesheet = ({
    container: {
     display: "block",
     position: "relative",
    //  margin: "auto",
     height: "100%",
    //  width: "25%",
     overflow: "hidden",
     textAlign: "center",
    //  borderRadius: "25px",
     padding: "20px",
    //  border: "2px solid #BCC0CA",
     verticalAlign: "middle",
     backgroundColor: 'white'
     
    },
    spacing: {
     padding: "50px",
     fontSize: "20px"
    },
    titles: {
       textAlign: "center",
       fontSize: "80px"
       
    }, 

    text: {
        padding: "50x",
        fontSize: "21px"
    },
    bg: {
        backgroundColor: "#f2f2f2"
    },
    description: {
        textAlign: "center"
    }, 
    button: {
        backgroundColor: "#4285F4",
        color: "white",
        borderRadius: "4px",
        border: "none",
        textAlign: "center",
        fontSize: "28px",
      padding: "20px 32px",
        margin: "auto",
        textDecoration: "none",

    },
    buttonLeft: {
        backgroundColor: "#00C851",
        border: "none",
        color: "white",
        padding: "20px 70px",
        textAlign: "center",
        fontSize: "16px",
        margin: "10px 0px",
        borderRadius: "5%"
  }, 
    buttonRight: {
        backgroundColor: "#3333ff", 
        border: "none",
        color: "white",
        padding: "20px 70px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
        position: "absolute",
        float: "right",
        borderRadius: "5%",
        float: "center"

    },
    
})
const mapStateToProps = (state) => {
    return {

    }
}



//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IndexPageContainer ));
