import React from 'react'
import "../App.css";

function Header({currentPlayer, gameStarted}) {
  return (
    <div className="header">
    {!gameStarted && <h1>Make Your first move</h1>}
    {gameStarted && currentPlayer === "X" && <h1>X turn</h1>}
    {gameStarted && currentPlayer === "O" && <h1>O turn</h1>}
    </div>
  )
}

export default Header