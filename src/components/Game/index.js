import React, { useState } from 'react'
import { Container } from './styles'
import { Board } from '../Board'
import { Pawn, pawnMoves } from '../Pawn'
import { Horse, horseMoves } from '../Horse'

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

const getCellColor = (index, size) => {
  return (((Math.floor(index / size)) + (index % size)) % 2 === 0) ? 'green' : 'white'
}

const numberToAlpha = (number) => {
  return String.fromCharCode("A".charCodeAt(0) + number)
}
const alphaToNumber = (alpha) => {
  return alpha.charCodeAt(0);
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

const getCol = (cellIndex) => {
  return cellIndex[0]
}

const getRow = (cellIndex) => {
  return cellIndex[1]
}

const validMove = (colIndex, rowIndex, board) => {
  if (colIndex < 'A' || colIndex > 'H') return false
  if (rowIndex < 1 || rowIndex > 8) return false

  const cellIndex = `${colIndex}${rowIndex}`
  if (board[cellIndex].piece) return false

  return true
}

export const Game = () => {

  const initBoard = getDefaultBoard()
  const [board, setBoard] = useState(initBoard)

  const displayMoves = (index, moves) => {
    if(!moves) return
    const row = parseInt(getRow(index))
    const col = alphaToNumber(getCol(index))
    const newBoard = {...board}

    const movesIndex = moves.map(move => {
      const colIndex = String.fromCharCode(col + move.x)
      const rowIndex = row + move.y

      return validMove(colIndex, rowIndex, board) ? `${colIndex}${rowIndex}` : null
    }).filter(move => move)

    movesIndex.forEach( moveIndex => {
      newBoard[moveIndex].border = 'red'
    })

    setBoard(newBoard)

  }

  return (
    <Container>
      <Board size={8} initBoard={board} handleClickCell={displayMoves} />
    </Container>
  )
}