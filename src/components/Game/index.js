import React, { useState } from 'react'
import { Container } from './styles'
import { Board } from '../Board'
import { Pawn, pawnMoves } from '../Pawn'
import { Horse, horseMoves } from '../Horse'
import { getRow } from '../Board'
import { numberToAlpha, getCellColor, checkNested } from '../../Utilities'
import clonedeep from 'lodash.clonedeep'

const getDefaultBoard = () => {
  const size = 8

  const board = Array(size ** 2).fill().map((_, index) => index).reduce((acc, index) => {
    const cellIndex = `${numberToAlpha((index % size))}${size - Math.floor(index / size)}`
    acc[cellIndex] = {
      ...setPiecesInBoard(cellIndex),
      color: getCellColor(index, size)
    }
    return acc
  }, {})

  return board
}

const clearMovesFromBoard = (board) => {
  const cleanBoard = clonedeep(board)

  for (let indexCell in cleanBoard) {
    if( !checkNested(cleanBoard, indexCell, 'border')) continue;

    cleanBoard[indexCell].border = null
  }

  return cleanBoard

}

const setPiecesInBoard = (cellIndex) => {
  const whitePawns = (cellIndex) => getRow(cellIndex) === '2' && { piece: <Pawn isWhite />, moves: pawnMoves, white: true }
  const blackPawns = (cellIndex) => getRow(cellIndex) === '7' && { piece: <Pawn />, moves: pawnMoves }
  const whiteHorses = (cellIndex) => ['C1', 'F1'].includes(cellIndex) && { piece: <Horse isWhite />, moves: horseMoves, white: true }
  const blackHorses = (cellIndex) => ['C8', 'F8'].includes(cellIndex) && { piece: <Horse />, moves: horseMoves }

  return whitePawns(cellIndex) ||
    blackPawns(cellIndex) ||
    whiteHorses(cellIndex) ||
    blackHorses(cellIndex) ||
    null
}

export const Game = () => {

  const initBoard = getDefaultBoard()
  const [board, setBoard] = useState(initBoard)

  const showMoves = (index, moves) => {
    const clearedBoard = clearMovesFromBoard(board);
    const newBoard = moves(index, clearedBoard);
    setBoard(newBoard)
  }

  return (
    <Container>
      <Board size={8} board={board} handleClickCell={showMoves} />
    </Container>
  )
}