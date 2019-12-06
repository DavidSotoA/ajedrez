import React from 'react'
import whiteRook from '../../images/whiteRook.png'
import blackRook from '../../images/blackRook.png'
import { Piece } from '../Piece'
import {getCrossMoves} from '../Board/moves'

export const Rook = ({ isWhite }) => {
    const img = isWhite ? whiteRook : blackRook
    return <Piece img={img} value={3} />
}


export const rookMoves = (row, col, cell, board, standarFilter, player) => {

    const moves = getCrossMoves(row, col, board)

    return standarFilter(moves, board, cell)

}