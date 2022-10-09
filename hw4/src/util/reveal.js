/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
    const boardX = board.length;
    const boardY = board[0].length;
    // console.log(x, y, "board", boardX, boardY);
    if (x < 0 || x > boardX - 1) return;
    if (y < 0 || y > boardY - 1) return;
    if (board[x][y].revealed || board[x][y].flagged) return;
    board[x][y].revealed = true;
    newNonMinesCount--;
    if (board[x][y].value === 0) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let revealed_store = revealed(
                    board,
                    x + i,
                    y + j,
                    newNonMinesCount
                );
                if (revealed_store === undefined) continue;
                board = revealed_store.board;
                newNonMinesCount = revealed_store.newNonMinesCount;
            }
        }
    }

    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.

    return { board, newNonMinesCount };
};
