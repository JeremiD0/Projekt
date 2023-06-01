  import React, {useState, useEffect} from 'react';
  import axios from 'axios';
  import NoteTile from './kafelekFiszka.js';

  function Fiszki() {
      const [fiszki, setFiszki] = useState([]);
      const [note, setNote] = useState(0);
      const [confirmation, setConfirmation] = useState(false);
      useEffect(() => {
          fetchData();
      }, [fiszki]);

      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:3333/api/fiszki');
              console.log(response.data)
              setFiszki(response.data);
          } catch (error) {
              console.error('Błąd pobierania danych z API: ', error); 
          }
      };

      function fetchDel() {
        fetch('http://localhost:3333/api/fiszki/delete', {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "elementId": note
          })
        });
      }

      const handleClick = () => {
        if (confirmation) {
          fetchDel();
          setConfirmation(false);
          setTimeout(fetchData, 900);
        } else {
          setConfirmation(true);
        }
      };
    

      return (
          <>
              <div className="button">

                  


                  {confirmation ? (
          <button className="AddBtn" onClick={handleClick}>POTWIERDŹ</button>
        ) : (
          <button className="DelBtn" onClick={handleClick}>Usuń</button>
        )}

              </div>


              <div className="textarea-container">

                  <div className="note">
                      {
                      fiszki.map((notatka) => (
                        <div className={(Date.parse(notatka.deadline) < (Date.now() - 90000000))
                          ? "grey"
                          : (Date.parse(notatka.deadline) < (Date.now() + 90000000))
                              ? (Date.parse(notatka.deadline) < (Date.now() + 15000000))
                                ? "red"
                                : "orange"
                              : "white"
                              }>
                          <NoteTile key={
                                  notatka.id
                              }
                              setNote={setNote}
                              id={
                                  notatka.id
                              }
                              nazwa={
                                  notatka.nazwa
                              }
                              opis={
                                  notatka.opis
                              }
                              sala={
                                  notatka.sala
                              }
                              wykonawca={
                                  notatka.wykonawca
                              }
                              deadline={
                                  notatka.deadline
                              }/>
                          </div>
                      ))
                  }
                      {fetchData} </div>

              </div>

          </>
      );
  }

  export default Fiszki;
