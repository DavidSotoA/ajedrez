import React from 'react'
import { BoardGame, Cell } from './styles'

const renderCells = (initBoard, handleClickCell) => {
 
  return Object.keys(initBoard).map((key, index) => {
    const cell = initBoard[key]
    return (
      <Cell onClick={() =>handleClickCell(key, cell.moves)} id={key} border={cell.border} background={cell.color} key={index}>
        {cell.piece}
      </Cell>
    )
  })
}


export const Board = ({ size = 8, initBoard, handleClickCell }) => {

  return (
    <BoardGame size={size} >
      {renderCells(initBoard, handleClickCell)}
    </BoardGame> 
  )
}