import styled from 'styled-components'


export const Container = styled.div``


export const BoardGame = styled.div`
  display: grid;
  height: ${p => p.height}px;
  width: ${p => p.width}px;
  border: solid black 1px;
  grid-template-columns: repeat(${p => p.size}, ${p => p.height/p.size}px);
  grid-template-rows: repeat(${p => p.size}, ${p => p.width/p.size}px);
`

export const Cell = styled.div`
  background: ${ p => p.background ? p.background : 'green'};
  border: ${p => p.border ? 'solid red 2px' : ''};
  cursor: ${p => p.border ? 'pointer' : ''};
  display: flex;
  justify-content: center;
  align-items: center;
`