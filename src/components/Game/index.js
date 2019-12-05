import React, { useState } from 'react'
import { Container } from './styles'
import { Board } from '../Board'
import { Pawn, pawnMoves } from '../Pawn'
import { Horse, horseMoves } from '../Horse'
import { getRow } from '../Board'
import { numberToAlpha, getCellColor, checkNested, getArrayIndexFromBoard } from '../../Utilities'
import clonedeep from 'lodash.clonedeep'
import { config } from './config'

const getDefaultBoard = () => {
  const size = config.boardSize

  const board = Array(size ** 2).fill().map((_, index) => index).reduce((acc, index) => {
    const cellIndex = `${numberToAlpha((index % size))}${size - Math.floor(index / size)}`
    acc[cellIndex] = {
      ...setPiecesInBoard(cellIndex),
      color: getCellColor(index, size, config.cellColorOne, config.cellColorTwo)
    }
    return acc
  }, {})

  return board
}

const clearMovesFromBoard = (board) => {
  const cleanBoard = clonedeep(board)

  for (let indexCell in cleanBoard) {
    if (checkNested(cleanBoard, indexCell, 'border')) cleanBoard[indexCell].border = null
    if (cleanBoard[indexCell].color === config.cellColorClick) {
      cleanBoard[indexCell].color = getCellColor(getArrayIndexFromBoard(indexCell, config.boardSize), config.boardSize, config.cellColorOne, config.cellColorTwo )
    }

  }

  return cleanBoard

}

const movePiece = (fromIndex, toIndex, board) => {
  const newBoard = clonedeep(board);
  const { piece, moves, player } = newBoard[fromIndex]

  newBoard[toIndex] = { ...newBoard[toIndex], piece, moves, player }

  newBoard[fromIndex].piece = null
  newBoard[fromIndex].moves = null
  newBoard[fromIndex].player = null

  return newBoard
}

const setPiecesInBoard = (cellIndex) => {
  const whitePawns = (cellIndex) => getRow(cellIndex) === '2' && { piece: <Pawn isWhite />, moves: pawnMoves, player: 'white' }
  const blackPawns = (cellIndex) => getRow(cellIndex) === '7' && { piece: <Pawn />, moves: pawnMoves, player: 'black' }
  const whiteHorses = (cellIndex) => ['C1', 'F1'].includes(cellIndex) && { piece: <Horse isWhite />, moves: horseMoves, player: 'white' }
  const blackHorses = (cellIndex) => ['C8', 'F8'].includes(cellIndex) && { piece: <Horse />, moves: horseMoves, player: 'black' }

  return whitePawns(cellIndex) ||
    blackPawns(cellIndex) ||
    whiteHorses(cellIndex) ||
    blackHorses(cellIndex) ||
    null
}

const isMyTurn = (cell, currentPlayer) => {
  return (cell.player && cell.player ===  currentPlayer)
}

const updatePlayer = (currentPlayer) => {
  return currentPlayer === 'white' ? 'black' : 'white'
}


export const Game = () => {

  const initBoard = getDefaultBoard()

  const [currentPlayer, setCurrentPlayer] = useState('white')
  const [waitForMove, setWaitForMove] = useState({})
  const [board, setBoard] = useState(initBoard)


  const onClickPiece = (index, moves) => {
    if (!isMyTurn(board[index], currentPlayer)) return board;

    const clearedBoard = clearMovesFromBoard(board)
    const newBoard = moves(index, clearedBoard)
    newBoard[index].color = config.cellColorClick 
    setWaitForMove({ fromIndex: index })
    setBoard(newBoard)
  }

  const onClickEmptyCell = (index, board) => {
    if (!checkNested(board, index, 'border')) return
    if (board[index].border !== config.colorToMove) return

    const newBoard = movePiece(waitForMove.fromIndex, index, board)
    const clearedBoard = clearMovesFromBoard(newBoard);

    setCurrentPlayer(updatePlayer(currentPlayer))
    setBoard(clearedBoard)
  }

  const onClickCell = (index, moves) => {
    if (moves) onClickPiece(index, moves)
    else onClickEmptyCell(index, board)
  }

  return (
    <Container>
      <Board size={8} board={board} handleClickCell={onClickCell} />
    </Container>
  )
}