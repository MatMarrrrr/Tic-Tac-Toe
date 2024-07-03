import React from 'react';
import "../App.css";

function Modal({ title, visibility, closeModal }) {
  return (
    <div className="modalBackground" style={visibility ? {display: "grid"} : {display: "none"}}>
      <div className="modal">
        <h2>{title}</h2>
        <button className="modalButton" onClick={closeModal}>Restart Game</button>
      </div>
    </div>
  );
}

export default Modal;
