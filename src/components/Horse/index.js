import React from 'react'
import { validMove, getRow, getCol } from '../Board'
import whiteHorse from '../../images/whiteHorse.png'
import blackHorse from '../../images/blackHorse.png'
import { Piece } from '../Piece'
import { alphaToNumber } from '../../Utilities'

export const Horse = ({ isWhite }) => {
  const img = isWhite ? whiteHorse : blackHorse
  return <Piece img={img} getMoves={() => console.log('get the board from context and modify it')} value={3} />
}

export const horseMoves = (index, board) => {
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

  if (!moves) return
  const row = parseInt(getRow(index))
  const col = alphaToNumber(getCol(index))
  const newBoard = { ...board }

  const movesIndex = moves.map(move => {
    const colIndex = String.fromCharCode(col + move.x)
    const rowIndex = row + move.y

    return validMove(colIndex, rowIndex, board) ? `${colIndex}${rowIndex}` : null
  }).filter(move => move)

  movesIndex.forEach(moveIndex => {
    newBoard[moveIndex].border = 'red'
  })

  movesIndex.forEach(moveIndex => {
    newBoard[moveIndex].border = 'red'
  })

  return newBoard;

}