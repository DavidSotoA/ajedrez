import React, { useState } from 'react'
import whitepawn from '../../images/whitePawn.png'
import blackpawn from '../../images/blackPawn.png'
import { Piece } from '../Piece'

export const Pawn = ({ isWhite }) => {
  const img = isWhite ? whitepawn : blackpawn
  return <Piece img={img} value={1} />
}

const addFirstMove = (row, player) => {
  if (row === 2 && player === 'white') return { x: 0, y: 2 }
  if (row === 7 && player === 'black') return { x: 0, y: -2 }
  return {}
}

const atackMoves = (row, col, player, board) => {
 
  const moves = player === 'white' ? [{ x: 1, y: 1 }, { x: -1, y: 1 }] : [{ x: 1, y: -1 },{ x: -1, y: -1 }]

  return moves.filter(move => {
    const colIndex = String.fromCharCode(col + move.x)
    const rowIndex = row + move.y
    const indexMove = `${colIndex}${rowIndex}`
    if (board[indexMove].player && board[indexMove].player !== player) return true
    return false
  })

}

export const pawnMoves = (row, col, cell, board, standarFilter, player) => {

  const initMoves = player === 'white' ? [{ x: 0, y: 1 }] : [ { x: 0, y: -1 }]

  const moves = [...initMoves, addFirstMove(row, player), ...atackMoves(row, col, player, board) ]

  const PawnMoves = moves.map(move => {
    const colIndex = String.fromCharCode(col + move.x)
    const rowIndex = row + move.y
    const indexMove = `${colIndex}${rowIndex}`
    return indexMove
  })

  return standarFilter(PawnMoves, board, cell);
}
