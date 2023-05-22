import React from 'react'

function Header({currentPlayer, gameStarted}) {
  return (
    <div className="header">
    {gameStarted === false && <h1>Make Your first move</h1>}
    </div>
  )
}

export default Header