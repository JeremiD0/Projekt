import React from 'react';
import './Srodkowy.css';

export default function NoteTile(props) {
  function handleClick2() {
    props.setNote(props.id);
  }

  const deadlineDate = new Date(props.deadline);
  const formattedDate = `${deadlineDate.getFullYear()}-${deadlineDate.getMonth() + 1}-${deadlineDate.getDate()}`;

  return (
    <>
      <textarea
        key={props.id}
        onClick={handleClick2}
        value={`Nazwa: ${props.nazwa}\nOpis: ${props.opis}\nSala: ${props.sala}\nWykonawca: ${props.wykonawca}\nDeadline: ${formattedDate}`}
        readOnly={true}
        className="Fiszka"
      />
    </>
  );
}
