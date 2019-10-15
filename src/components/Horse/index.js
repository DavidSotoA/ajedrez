import React from 'react'
import whiteHorse from '../../images/whiteHorse.png'
import blackHorse from '../../images/blackHorse.png'
import {Piece} from '../Piece'

export const Horse = ({ isWhite }) => {
  const img = isWhite ? whiteHorse : blackHorse
  return <Piece img={img} value={3} />
}

export const horseMoves = [
    {x: -1, y: 2},
    {x: 1, y: 2},
    {x: 2, y: 1},
    {x: 2, y: -1},
    {x: 1, y: -2},
    {x: -1, y: -2},
    {x: -2, y: -1},
    {x: -2, y: 1}
  ]

