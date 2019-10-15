import React from 'react'
import whitepawn from '../../images/whitePawn.png'
import blackpawn from '../../images/blackPawn.png'
import {Piece} from '../Piece'

export const Pawn = ({ isWhite }) => {
  const img = isWhite ? whitepawn : blackpawn
  return <Piece img={img} value={1} />
}

export const pawnMoves = [ { x: 0, y: 2 }, { x: 0, y: 1}]