//You could call this file {ComponentName}.js as well, but you would have to ensure your imports are correct

import React from "react";
import styles from "./web.css";

export default class HelloWorld extends React.Component{ 
    render() { 
        return (
            <div className={styles.welcome}> 
                <div className={styleSheet.foo}> 
                    React says hello!
                </div> 
            </div> 
        )

    }

    someFunc = () => { 
        //'This' is automatically bound when writing functions like this
        return JSON.stringify(this.props);
    }
}

//Alternatively to writing CSS, you could include the react primitives StyleSheet
import {StyleSheet } from "react-primitives";

const styleSheet = StyleSheet.create({ 
    foo: { 
        width: 100,
        height: 100, 
        backGroundColor: '#FF00FF',
    }
})

//In addition to CSS modules, you may wish to use: https://github.com/gajus/react-css-modules