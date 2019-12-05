export const getCrossMoves = (row, col, board) => {

    const criteria = (acc, index, board) => {
        if (acc.stop) return acc;

        const stop = (board[index].piece) ? true : false
        return { stop, moves: [...acc.moves, index] }
    }

    const up = Array(8 - row).fill().reduce((acc, _, index) => {
        const cellIndex = `${String.fromCharCode(col)}${index + row + 1}`;
        return criteria(acc, cellIndex, board)
    },
        { stop: false, moves: [] }).moves

    const down = Array(row - 1).fill().reduce((acc, _, index) => {
        const cellIndex = `${String.fromCharCode(col)}${row - index - 1}`;
        return criteria(acc, cellIndex, board)
    },
        { stop: false, moves: [] }).moves


    const right = Array(64 + 8 - col).fill().reduce((acc, _, index) => {
        const cellIndex = `${String.fromCharCode(index + col + 1)}${row}`;
        return criteria(acc, cellIndex, board)
    },
        { stop: false, moves: [] }).moves


    const left = Array(col - 65).fill().reduce((acc, _, index) => {
        const cellIndex = `${String.fromCharCode(col - index - 1)}${row}`;
        return criteria(acc, cellIndex, board)
    },
        { stop: false, moves: [] }).moves

    const moves = [...up, ...right, ...down, ...left]

    return moves
}
