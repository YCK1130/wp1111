/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Board.css";
import Cell from "./Cell";
import Modal from "./Modal";
import Dashboard from "./Dashboard";
import { revealed } from "../util/reveal";
import createBoard from "../util/createBoard";
import React, { useEffect, useState } from "react";

const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]); // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0); // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]); // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false); // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0); // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false); // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.
        setBoard(newBoard.board);
        setMineLocations(newBoard.mineLocations);
        setNonMineCount(boardSize * boardSize - mineNum);
        setRemainFlagNum(mineNum);
    };

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    };

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        if (board[x][y].revealed) return;
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end
        if (newBoard[x][y].flagged) newFlagNum++;
        else if (newFlagNum > 0) newFlagNum--;
        else return;

        newBoard[x][y].flagged = !newBoard[x][y].flagged;
        setBoard(newBoard);
        setRemainFlagNum(newFlagNum);
    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        let newNonMineCount = nonMineCount;
        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.
        if (newBoard[x][y].value === "💣") {
            newBoard[x][y].revealed = true;
            mineLocations.map((location) => {
                if(!newBoard[location[0]][location[1]].flagged)newBoard[location[0]][location[1]].revealed = true;
                return location;
            });
            setBoard(newBoard);
            setTimeout(()=> {
                setGameOver(true);
            }, 300);
        } else {
            // newBoard[x][y].revealed = true;
            let revealed_store = revealed(board, x, y, nonMineCount);
            newBoard = revealed_store.board;
            newNonMineCount = revealed_store.newNonMinesCount;
            setBoard(newBoard);
            setNonMineCount(newNonMineCount);
        }
        // console.log(newNonMineCount);
        if (newNonMineCount === 0) setWin(true);
    };

    return (
        <div className="boardPage">
            <div className="boardWrapper">
                {/* This line of code is just for testing. Please delete it if you finish this function. */}
                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
                {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}

                {win || gameOver ? (
                    <Modal
                        restartGame={restartGame}
                        backToHome={backToHome}
                        win={win}
                    ></Modal>
                ) : null}
                <div className="boardContainer">
                    <Dashboard
                        remainFlagNum={remainFlagNum}
                        gameOver={gameOver||win}
                    ></Dashboard>
                    {board.map((row, index) => {
                        return (
                            <div
                                id={`row${index}`}
                                key={`row${index}`}
                                style={{ display: "flex" }}
                            >
                                {row.map((cell, index) => {
                                    return (
                                        <Cell
                                            rowIdx={cell.x}
                                            colIdx={cell.y}
                                            detail={cell}
                                            updateFlag={updateFlag}
                                            revealCell={revealCell}
                                            key={`${cell.x}-${cell.y}`}
                                        ></Cell>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Board;
