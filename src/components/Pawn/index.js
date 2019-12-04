import React from 'react'
import { validMove, getRow, getCol } from '../Board'
import whitepawn from '../../images/whitePawn.png'
import blackpawn from '../../images/blackPawn.png'
import { Piece } from '../Piece'
import { alphaToNumber } from '../../Utilities'

export const Pawn = ({ isWhite }) => {
  const img = isWhite ? whitepawn : blackpawn
  return <Piece img={img} value={1} />
}

export const pawnMoves = (index, board) => {
  const moves = [{ x: 0, y: 2 }, { x: 0, y: 1 }]

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
