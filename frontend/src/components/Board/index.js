import React from 'react'
import { BoardGame, Cell } from './styles'

const renderCells = (board, handleClickCell) => {

  return Object.keys(board).map((key, index) => {
    const cell = board[key]
    return (
      <Cell onClick={() => handleClickCell(key, cell.moves)} id={key} border={cell.border} background={cell.color} key={index}>
        {cell.piece}
      </Cell>
    )
  }) 
}

export const getCol = (cellIndex) => {
  return cellIndex[0]
}

export const getRow = (cellIndex) => {
  return cellIndex[1]
}

export const validMove = (colIndex, rowIndex, currentCell, targetCell) => {
  if (!targetCell) return false
  if (colIndex < 'A' || colIndex > 'H') return false
  if (rowIndex < 1 || rowIndex > 8) return false
  if (targetCell.player === currentCell.player) return false

  return true
}

export const Board = ({ size = 8, board, handleClickCell }) => {

  return (
    <BoardGame size={size} width={400} height={400} >
      {renderCells(board, handleClickCell)}
    </BoardGame>
  )
}