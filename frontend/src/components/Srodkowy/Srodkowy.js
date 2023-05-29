import { useState,useEffect } from 'react';
import React from "react";
import './Srodkowy.css'
import Fiszki from './fiszki';
import DelNote from './delNote';
export default class Srodkowy extends React.Component {
    
    
    render()
     {

       
        return (

            <div className="Srodkowy">
                
               <Fiszki/>


            </div>

        )
    }
}
