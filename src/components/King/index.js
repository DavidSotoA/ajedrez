import React from 'react'
import whiteKing from '../../images/whiteKing.png'
import blackKing from '../../images/blackKing.png'
import { Piece } from '../Piece'

export const King = ({ isWhite }) => {
  const img = isWhite ? whiteKing : blackKing
  return <Piece img={img} value={3} />
}


export const kingMoves = (row, col) => {
  const moves = [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 0 },  { x: -1, y: 1 }]

  const kingMoves = moves.map(move => {
    const colIndex = String.fromCharCode(col + move.x)
    const rowIndex = row + move.y
    const indexMove = `${colIndex}${rowIndex}`
    return indexMove
  })

  return kingMoves
}