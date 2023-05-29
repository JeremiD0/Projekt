import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteTile from './kafelekFiszka.js';

function Fiszki() {
  const [fiszki, setFiszki] = useState([]);
  const [note, setNote] = useState(0);

  useEffect(() => {
    fetchData();
  }, [note]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3333/api/fiszki');
      console.log(response.data)
      setFiszki(response.data);
    } catch (error) {
      console.error('Błąd pobierania danych z API: ', error);
    }
  };

  return (
    <>
      {fiszki.map((notatka) => (
        <NoteTile
          key={notatka.id}
          setNote={setNote}
          id={notatka.id}
          nazwa={notatka.nazwa}
          opis={notatka.opis}
          sala={notatka.sala}
          wykonawca={notatka.wykonawca}
          deadline={notatka.deadline}
        />
      ))}
      {fetchData}
    </>
  );
}

export default Fiszki;
