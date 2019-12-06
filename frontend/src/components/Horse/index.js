import React from 'react'
import whiteHorse from '../../images/whiteHorse.png'
import blackHorse from '../../images/blackHorse.png'
import { Piece } from '../Piece'

export const Horse = ({ isWhite }) => {
  const img = isWhite ? whiteHorse : blackHorse
  return <Piece img={img} value={3} />
}


export const horseMoves = (row, col, cell, board, standarFilter, player) => {
  const moves = [
    { x: -1, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: 1, y: -2 },
    { x: -1, y: -2 },
    { x: -2, y: -1 },
    { x: -2, y: 1 }
  ]


  const horseMoves = moves.map(move => {
    const colIndex = String.fromCharCode(col + move.x)
    const rowIndex = row + move.y
    const indexMove = `${colIndex}${rowIndex}`
    return indexMove
  })

  return standarFilter(horseMoves, board, cell)
}