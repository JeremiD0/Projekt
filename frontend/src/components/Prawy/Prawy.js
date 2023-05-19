import React from "react";
import './Prawy.css'

export default class Prawy extends React.Component { 
    render() {
        return (
            <div className="Prawy">
                <h1> NOTATKI </h1>
                <input type="text" /> <button type="submit" name="dodaj_notatke" id="dodaj_notatke"> Dodaj </button>
                <textarea name="notatka1" cols="30" rows="3" placeholder="Notatka 1" value="Zmiana sal z nauczycielem X (z sali nr. 18 na sale nr. 2)" readOnly/>
                <textarea name="notatka2" cols="30" rows="3" placeholder="Notatka 2" readOnly/>
                <textarea name="notatka3" cols="30" rows="3" placeholder="Notatka 3" readOnly/>
                <textarea name="notatka4" cols="30" rows="3" placeholder="Notatka 4" readOnly/>
                <textarea name="notatka5" cols="30" rows="3" placeholder="Notatka 5" readOnly/>
                <textarea name="notatka6" cols="30" rows="3" placeholder="Notatka 6" readOnly/>
                <div className="btn">
                    <button type="submit" name="edytuj_notatke" id="edytuj_notatke"> Edytuj </button>
                </div>
            </div>
        )
    }
 }