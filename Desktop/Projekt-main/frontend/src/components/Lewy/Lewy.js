import React from "react";
import './Lewy.css'
import {useState, useEffect} from 'react'
import axios from "axios";

export default function Lewy(props) {

    const [nazwa, setNazwa] = useState("");
    const [opis, setOpis] = useState("");
    const [sala, setSala] = useState("");
    const [wykonawca, setWykonawca] = useState("");
    const [deadline, setDeadline] = useState("");
    const [users, setUsers] = useState([]);
    const [fiszki, setFiszki] = useState([]);
  
  
    useEffect(() => {
      fetchData();
      Refresh();
      
    }, []);
  
    const Refresh = async () => {
      const response = await axios.get("http://localhost:3333/api/uzytkownicy");
      setUsers(response.data);
    };

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3333/api/fiszki');
        setFiszki(response.data);
      } catch (error) {
        console.error('Błąd pobierania danych z API: ', error);
      }
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const   fiszkaData = {
        nazwa: nazwa,
        opis: opis,
        sala: sala,
        wykonawca: wykonawca,
        deadline: deadline,
      };
  
      try {
        const response = await axios.post(
          "http://localhost:3333/api/fiszki/add",
          fiszkaData
        ).then(
          props.setFiszki()
        )
       
        setNazwa("");
        setOpis("");
        setSala("");
        setWykonawca("");
        setDeadline("");
      } catch (error) {
        console.error("Błąd podczas tworzenia fiszki:", error.response.data.error);
        // Obsługa błędu
      }
    };
  
    return (
      <div className="Lewy">
        <h1>Stwórz fiszkę:</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Nazwa:</p>
            <input
              className="NameInput"
              type="text"
              value={nazwa}
              onChange={(e) => setNazwa(e.target.value)}
            />
          </label>
          <label>
            <p>Sala:</p>
            <select
              className="sala"
              value={sala}
              onChange={(e) => setSala(e.target.value)}
            >
              <option>Sala 2</option>
              <option>Sala 3</option>
              <option>Sala 4</option>
              <option>Sala 18</option>
              <option>Sala 105</option>
              <option>Sala 109</option>
              <option>Sala 110</option>
              <option>Sala 117</option>
              <option>Sala 121 (biblioteka)</option>
              <option>Serwerownia</option>
            </select>
          </label>
          <label>
            <p>Wykonawca:</p>
            <div className="checkboxes">
              {users.map((user) => (
                <div className="checkbox1" key={user._id}>
                  <input
                    type="checkbox"
                    id={user._id}
                    className="c1"
                    name="MK"
                    onChange={() => setWykonawca(user.login)}
                  />
                  <div className="c1Child">
                    {user._id} {user.login}
                  </div>
                </div>
              ))}
            </div>
          </label>
          <label>
            <p>Deadline:</p>
            <div>

              
            <input type="date"
                value={deadline}
                onChange={(e)=> setDeadline(e.target.value)}
                className="kalendarz"/>
        </div>

          </label>
          <label>
                <p>
                    Opis (opcjonalnie):
                </p>
                <input onChange={(e) => setOpis(e.target.value)}
                    value={opis}
                    className="NameInput"
                    type="text"/>
            </label>
            <div className="przyciski">
                <button onClick={()=>{fetchData(); setTimeout(fetchData, 900);}} className="DodBtn" type="submit">
                    Dodaj
                </button>
            </div>
        </form>
      </div>
    );
  }