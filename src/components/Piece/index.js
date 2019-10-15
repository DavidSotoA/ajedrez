import React from 'react'
import { Img } from './styles'

export const Piece = ({ img, value, getMoves }) => {
  return (
    <Img onClick={getMoves} src={img} />
  )
}
