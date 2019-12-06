import React from 'react'
import whiteBishop from '../../images/whiteBishop.png'
import blackBishop from '../../images/blackBishop.png'
import { Piece } from '../Piece'
import { getDiagonalMoves } from '../Board/moves'

export const Bishop = ({ isWhite }) => {
    const img = isWhite ? whiteBishop : blackBishop
    return <Piece img={img} value={3} />
}


export const bishopMoves = (row, col, cell, board, standarFilter, player) => {

    const moves = getDiagonalMoves(row, col, board)

    return standarFilter(moves, board, cell)

}