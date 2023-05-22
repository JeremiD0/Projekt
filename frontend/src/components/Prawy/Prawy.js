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
                <div className="btn">
                    <button type="submit" name="edytuj_notatke" id="edytuj_notatke">
                        Edytuj
                    </button>
                </div>
            </div>
        )
    }
}
