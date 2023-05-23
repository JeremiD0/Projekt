import React from "react";
import './Lewy.css'
import { useState } from 'react'


function MojaKomponenta() {
    const [dzisiejszaData, setDzisiejszaData] = useState('');
  
    const ustawDzisiejszaDate = () => {
      const dzis = new Date();
      const rok = dzis.getFullYear();
      const miesiac = (dzis.getMonth() + 1).toString().padStart(2, '0');
      const dzien = dzis.getDate().toString().padStart(2, '0');
      const dzisiejszaData = `${rok}-${miesiac}-${dzien}`;
      setDzisiejszaData(dzisiejszaData);
    };
  
    return (
      <div>
        <input
          type="date"
          value={dzisiejszaData}
          onChange={(e) => setDzisiejszaData(e.target.value)}
          className="kalendarz"
        />
        <button onClick={ustawDzisiejszaDate}>Ustaw dzisiejszą datę</button>
      </div>
    );
  }

export default function Lewy() 
    {
        
     
        return ( 

            <div className="Lewy">
                
                <h1> Stwórz fiszkę: </h1>
                <label>
                    <p> Nazwa: </p>
                    <input className="NameInput" type="text" />
                </label>
                <label>
                    <p> Sala: </p>
                    <select className="sala">
                        <option> Sala 1 </option>
                        <option> Sala 2 </option>
                        <option> Sala 3 </option>
                    </select>
                </label>
                <label >
                    <p> Wykonawca: </p>
                    
                    
                    <div className="checkbox1">
                    <input type="checkbox" id ="MK" className="c1" name="MK"/> <div className="c1Child">Michał Kucko</div>
                    </div>
                    
                    <div className="checkbox1">
                    <input type="checkbox" id ="XX" className="c1" name="XX"/> <div className="c1Child">Pan X</div>
                    </div>
                    
                   
                    
                </label>
                <label>
                    <p> Deadline: </p>
                    {MojaKomponenta()}
                </label>
                <label>
                    <p> Opis (opcjonalnie): </p>
                    <input className="NameInput" type="text" /> 
                </label>
                <div>
                    <button type="submit"> Dodaj </button> <button type="submit"> Wyczyść </button>
                </div>
            </div>
        
        )
 }