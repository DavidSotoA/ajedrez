export const numberToAlpha = (number) => {
  return String.fromCharCode("A".charCodeAt(0) + number)
}

export const alphaToNumber = (alpha) => {
  return alpha.charCodeAt(0);
}

export const getCellColor = (index, size) => {
  return (((Math.floor(index / size)) + (index % size)) % 2 === 0) ? 'green' : 'white'
}

export const checkNested = (obj, level,  ...rest) => {
  if (obj === undefined) return false
  if (rest.length == 0 && obj.hasOwnProperty(level)) return true
  return checkNested(obj[level], ...rest)
}