import React from 'react'
import whitepawn from '../../images/whitePawn.png'
import blackpawn from '../../images/blackPawn.png'
import { Piece } from '../Piece'

export const Pawn = ({ isWhite }) => {
  const img = isWhite ? whitepawn : blackpawn
  return <Piece img={img} value={1} />
}

export const pawnMoves = (row, col, cell, board, standarFilter, player) => {
  const moves = player === 'white' ? [
                                      { x: 0, y: 2 },
                                      { x: 0, y: 1 },
                                      { x: 1, y: 1 },
                                      { x: -1, y: 1 }
                                     ]
                                      : 
                                     [
                                      { x: 0, y: -2 },
                                      { x: 0, y: -1 },
                                      { x: 1, y: -1 },
                                      { x: -1, y: -1 }
                                    ]


  const PawnMoves = moves.map(move => {
    const colIndex = String.fromCharCode(col + move.x)
    const rowIndex = row + move.y
    const indexMove = `${colIndex}${rowIndex}`
    return indexMove
  })

  return standarFilter(PawnMoves, board, cell);
}
