import React from 'react'
import whiteQueen from '../../images/whiteQueen.png'
import blackQueen from '../../images/blackQueen.png'
import { Piece } from '../Piece'
import { getDiagonalMoves, getCrossMoves } from '../Board/moves'

export const Queen = ({ isWhite }) => {
    const img = isWhite ? whiteQueen : blackQueen
    return <Piece img={img} value={3} />
}


export const queenMoves = (row, col, cell, board, standarFilter, player) => {

    const moves = [...getCrossMoves(row, col, board), ...getDiagonalMoves(row, col, board)]

    return standarFilter(moves, board, cell)

}