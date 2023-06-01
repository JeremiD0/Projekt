import React from 'react'

function Notes() {

   const handleButtonClick = async () => {
        try {
          await axios.post('http://localhost:3333/api/notatki', { tekst: inputValue });
          fetchData();
          setInputValue('');
        } catch (error) {
          console.error('Błąd zapisu danych do API: ', error);
        }
      };



  return (
    <div>Notes</div>
  )
}

export default Notes