import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteTile from './kafeleknotatka';
import './Prawy.css';

const App = () => {
  const [confirmation, setConfirmation] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [notatki, setNotatki] = useState([]);
  const [note, setNote] = useState(0);

  useEffect(() => {
    fetchData();
  }, [note]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3333/api/notatki');
      setNotatki(response.data);
    } catch (error) {
      console.error('Błąd pobierania danych z API: ', error);
    }
  };

  const handleButtonClick = async () => {
    try {
      await axios.post('http://localhost:3333/api/notatki', { tekst: inputValue });
      fetchData();
      setInputValue('');
    } catch (error) {
      console.error('Błąd zapisu danych do API: ', error);
    }
  };

  function fetchDel() {
    fetch('http://localhost:3333/api/notatki/delete', {
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

  const isNoteValid = inputValue.length > 0;

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className='lInput'
      />
      <button
        onClick={handleButtonClick}
        className='dodajBtn'
        disabled={!isNoteValid}
      >
        Dodaj
      </button>

      {notatki.map((notatka) => (
        <NoteTile key={notatka.id} setNote={setNote} id={notatka.id} tekst={notatka.tekst} />
      ))}

      {confirmation ? (
        <button onClick={handleClick}>POTWIERDŹ</button>
      ) : (
        <button onClick={handleClick}>Usuń</button>
      )}
    </div>
  );
};

export default App;