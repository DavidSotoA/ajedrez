const criteria = (acc, index, board) => {
    if (acc.stop) return acc;

    const stop = (board[index].piece) ? true : false
    return { stop, moves: [...acc.moves, index] }
}

export const getCrossMoves = (row, col, board) => {

    const topSize = 8 - row;
    const downSize = row - 1;
    const rightSize = 64 + 8 - col;
    const leftSize = col - 65;

    const up = Array(topSize).fill().reduce((acc, _, index) => {
        const cellIndex = `${String.fromCharCode(col)}${index + row + 1}`;
        return criteria(acc, cellIndex, board)
    },
        { stop: false, moves: [] }).moves

    const down = Array(downSize).fill().reduce((acc, _, index) => {
        const cellIndex = `${String.fromCharCode(col)}${row - index - 1}`;
        return criteria(acc, cellIndex, board)
    },
        { stop: false, moves: [] }).moves


    const right = Array(rightSize).fill().reduce((acc, _, index) => {
        const cellIndex = `${String.fromCharCode(index + col + 1)}${row}`;
        return criteria(acc, cellIndex, board)
    },
        { stop: false, moves: [] }).moves


    const left = Array(leftSize).fill().reduce((acc, _, index) => {
        const cellIndex = `${String.fromCharCode(col - index - 1)}${row}`;
        return criteria(acc, cellIndex, board)
    },
        { stop: false, moves: [] }).moves

    const moves = [...up, ...right, ...down, ...left]

    return moves
}


export const getDiagonalMoves = (row, col, board) => {

    const topSize = 8 - row;
    const downSize = row - 1;
    const rightSize = 64 + 8 - col;
    const leftSize = col - 65;

    const topRight = Array( Math.min(topSize, rightSize) ).fill().reduce((acc, _, index) => {
        const cellIndex = `${String.fromCharCode(col + index + 1)}${index + row + 1}`;
        return criteria(acc, cellIndex, board)
    },
        { stop: false, moves: [] }).moves


    const downRight = Array( Math.min(downSize, rightSize) ).fill().reduce((acc, _, index) => {
        const cellIndex = `${String.fromCharCode(col + index + 1)}${row - index -1}`;
        return criteria(acc, cellIndex, board)
    },
        { stop: false, moves: [] }).moves
    

    const downLeft = Array( Math.min(downSize, leftSize) ).fill().reduce((acc, _, index) => {
        const cellIndex = `${String.fromCharCode(col - index - 1)}${row - index -1}`;
        return criteria(acc, cellIndex, board)
    },
        { stop: false, moves: [] }).moves
    

    const topLeft = Array( Math.min(topSize, leftSize) ).fill().reduce((acc, _, index) => {
        const cellIndex = `${String.fromCharCode(col - index - 1)}${row  +  index  + 1}`;
        return criteria(acc, cellIndex, board)
    },
        { stop: false, moves: [] }).moves
    

    const moves = [...topRight, ...downRight, ...downLeft, ...topLeft]

    return moves
    
}