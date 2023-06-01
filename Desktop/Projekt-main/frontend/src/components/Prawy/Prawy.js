import React, {useState}from "react";
import './Prawy.css'
import App from "./addNote";


export default class Prawy extends React.Component {
    render() {
        return (
            <div className="Prawy">
                <h1>
                    NOTATKI
                </h1>
                <App/>
               
            </div>
        )
    }
}
