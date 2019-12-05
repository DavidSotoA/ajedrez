import React, { useState } from 'react'
import { Container } from './styles'
import { Board } from '../Board'
import { Pawn, pawnMoves } from '../Pawn'
import { Horse, horseMoves } from '../Horse'
import { King, kingMoves } from '../King'
import { Rook, rookMoves } from '../Rook'
import { Bishop, bishopMoves } from '../Bishop'
import { Queen, queenMoves } from '../Queen'

import { getRow, getCol, validMove } from '../Board'
import { numberToAlpha, getCellColor, checkNested, getArrayIndexFromBoard, alphaToNumber } from '../../Utilities'
import clonedeep from 'lodash.clonedeep'
import { config } from './config'

const getDefaultBoard = () => {
  const size = config.boardSize

  const board = Array(size ** 2).fill().map((_, index) => index).reduce((acc, index) => {
    const cellIndex = `${numberToAlpha((index % size))}${size - Math.floor(index / size)}`
    acc[cellIndex] = {
      ...setPiecesInBoard(cellIndex),
      color: getCellColor(index, size, config.cellColorOne, config.cellColorTwo),
      board: 'none'
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

const capturePiece = ( fromCell, targetCell ) => {

}

const movePiece = (fromIndex, toIndex, board) => {
  const newBoard = clonedeep(board);
  const { piece, moves, player } = newBoard[fromIndex]
  const targetCell = newBoard[toIndex]

  newBoard[toIndex] = { ...targetCell, piece, moves, player }

  newBoard[fromIndex].piece = null
  newBoard[fromIndex].moves = null
  newBoard[fromIndex].player = null

  return newBoard
}

const setPiecesInBoard = (cellIndex) => {
  const whiteKing = (cellIndex) => cellIndex === 'D1' && { piece: <King isWhite />, moves: kingMoves, player: 'white' }
  const blackKing = (cellIndex) => cellIndex === 'D8' && { piece: <King />, moves: kingMoves, player: 'black' }

  const whitePawns = (cellIndex) => getRow(cellIndex) === '2' && { piece: <Pawn isWhite />, moves: pawnMoves, player: 'white' }
  const blackPawns = (cellIndex) => getRow(cellIndex) === '7' && { piece: <Pawn />, moves: pawnMoves, player: 'black' }
  
  const whiteHorses = (cellIndex) => ['B1', 'G1'].includes(cellIndex) && { piece: <Horse isWhite />, moves: horseMoves, player: 'white' }
  const blackHorses = (cellIndex) => ['B8', 'G8'].includes(cellIndex) && { piece: <Horse />, moves: horseMoves, player: 'black' }
  const whiteRook = (cellIndex) => ['A1', 'H1'].includes(cellIndex) && { piece: <Rook isWhite />, moves: rookMoves, player: 'white' }
  const blackRook = (cellIndex) => ['A8', 'H8'].includes(cellIndex) && { piece: <Rook />, moves: rookMoves, player: 'black' }
  const whiteBishop = (cellIndex) => ['C1', 'F1'].includes(cellIndex) && { piece: <Bishop isWhite />, moves: bishopMoves, player: 'white' }
  const blackBishop = (cellIndex) => ['C8', 'F8'].includes(cellIndex) && { piece: <Bishop />, moves: bishopMoves, player: 'black' }
  const whiteQueen = (cellIndex) => cellIndex === 'E1' && { piece: <Queen isWhite />, moves: queenMoves, player: 'white' }
  const blackQueen = (cellIndex) => cellIndex === 'E8' && { piece: <Queen />, moves: queenMoves, player: 'black' }
 
  return (
    whiteQueen(cellIndex) ||
    blackQueen(cellIndex) ||
    whiteBishop(cellIndex) ||
    blackBishop(cellIndex) ||
    whiteRook(cellIndex) ||
    blackRook(cellIndex) ||
    blackKing(cellIndex) ||
    whiteKing(cellIndex) ||
    whitePawns(cellIndex) ||
    blackPawns(cellIndex) ||
    whiteHorses(cellIndex) ||
    blackHorses(cellIndex) ||
    null
  )
}

const isMyTurn = (cell, currentPlayer) => {
  return (cell.player && cell.player ===  currentPlayer)
}

const updatePlayer = (currentPlayer) => {
  return currentPlayer === 'white' ? 'black' : 'white'
}

const standarFilterMoves = (moves, board, cell) => {

  return moves.filter( moveIndex => {
    const rowIndex = getRow(moveIndex)
    const colIndex = getCol(moveIndex)
    const targetCell = board[moveIndex]

    return validMove(colIndex, rowIndex, cell, targetCell)
  })

}

const moves = (index, board, pieceMoves) => {
  const row = parseInt(getRow(index))
  const col = alphaToNumber(getCol(index))
  const cell = board[index]
  const player = cell.player

  const moves = pieceMoves(row, col, cell, board, standarFilterMoves, player)


  const newBoard = { ...board }
  moves.forEach(moveIndex => {
    newBoard[moveIndex].border = 'red'
  })

  return newBoard;
}


export const Game = () => {

  const initBoard = getDefaultBoard()

  const [currentPlayer, setCurrentPlayer] = useState('white')
  const [waitForMove, setWaitForMove] = useState({})
  const [board, setBoard] = useState(initBoard)

  const onClickPiece = (index, pieceMoves) => {
    if (!isMyTurn(board[index], currentPlayer)) return board;

    const clearedBoard = clearMovesFromBoard(board)
    const newBoard = moves(index, clearedBoard, pieceMoves)
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

  const onClickCell = (index, pieceMoves) => {
    if (pieceMoves ) onClickPiece(index, pieceMoves)
    else onClickEmptyCell(index, board)
  }

  return (
    <Container>
      <Board size={8} board={board} handleClickCell={onClickCell} />   
      {/* <h2><span style={{fontWeight: 'bold'}} >Current player: </span>{currentPlayer}</h2> */}
    </Container>
  )
}