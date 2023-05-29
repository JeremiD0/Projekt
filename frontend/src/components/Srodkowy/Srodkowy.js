import { useState,useEffect } from 'react';
import React from "react";
import './Srodkowy.css'
import Fiszki from './fiszki';

export default class Srodkowy extends React.Component {
    
    
    render()
     {

       
        return (

            <div className="Srodkowy">
                
                <div className="button">

                    <button className="EditBtn"type="submit">
                        Edytuj
                    </button>


                   

                    <button  className="DelBtn" type="submit">
                        Usun
                    </button>

                </div>


                <div className="textarea-container">

                    <div className="note">
                        <Fiszki/>
                    </div>

                </div>


            </div>

        )
    }
}
