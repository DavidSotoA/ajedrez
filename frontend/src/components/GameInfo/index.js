import React from 'react'

export const GameInfo = ({ myPlayer, currentPlayer, gameState }) => {

  return (
    <>
      <h2>State: {gameState}</h2>
      <h2>My player: {myPlayer}</h2>
      <h2>Current player: {currentPlayer}</h2>
    </>
  )
}