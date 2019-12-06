

export const numberToAlpha = (number) => {
  return String.fromCharCode("A".charCodeAt(0) + number)
}

export const alphaToNumber = (alpha) => {
  return alpha.charCodeAt(0);
}


export const getArrayIndexFromBoard = (boardIndex, boardSize) => {
  const [col, row]  = boardIndex.split('');
  return parseInt((boardSize - row )*boardSize) + (alphaToNumber(col) - 65);
}

export const getCellColor = (index, size, colorOne, colorTwo) => {
  return (((Math.floor(index / size)) + (index % size)) % 2 === 0) ? colorOne : colorTwo
}

export const checkNested = (obj, level,  ...rest) => {
  if (obj === undefined) return false
  if (rest.length == 0 && obj.hasOwnProperty(level)) return true
  return checkNested(obj[level], ...rest)
}

export const getPieceName = (cell) => {
  if (!checkNested(cell, 'piece', 'type', 'name')) return undefined;
  return cell['piece']['type']['name']
}