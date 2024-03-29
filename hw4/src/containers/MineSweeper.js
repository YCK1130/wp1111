/****************************************************************************
  FileName      [ MineSweeper.js ]
  PackageName   [ src/containers ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ The control and main page of MineSweeper. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./MineSweeper.css";
import Board from "../components/Board";
import React, { useState } from "react";
import HomePage from "../components/HomePage";

const MineSweeper = () => {
    const [startGame, setStartGame] = useState(false); // A boolean variable. If true, show `Board`, else show `HomePage`.
    const [mineNum, setMineNum] = useState(10); // A integer variable to store the number of mines in the game. The default value is 10.
    const [boardSize, setBoardSize] = useState(8); // A integer variable to store the board size in the game. The default value is 8.
    const [error, setError] = useState(false); // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

    // Basic TODO: Change `startGame` from false to true when this function is called
    const startGameOnClick = () => {
        setStartGame(true);
    };

    // Advanced TODO: Change `mineNum` to the number you send by this function
    const mineNumOnChange = (value) => {
        const mineValue = value.target.value;
        setMineNum(mineValue);
        mineValue >= boardSize * boardSize ? setError(true) : setError(false);
    };

    // Advanced TODO: Change `boardSize` to the number you send by this function
    const boardSizeOnChange = (value) => {
        const boardSizeValue = value.target.value;
        setBoardSize(boardSizeValue);
        mineNum >= boardSizeValue * boardSizeValue ? setError(true) : setError(false);
    };

    // Advanced TODO: Change `startGame` from true to false when this function is called
    const backToHomeOnClick = () => {
        setStartGame(false);
    };

    return (
        <div className="mineSweeper">
            {/* Basic TODO: `HomePage` and `Board` will switch based on the mode of `startGame`. If `startGame` is true, show `Board`; else show `HomePage` */}
            {startGame ? (
                <Board
                    boardSize={boardSize}
                    mineNum={mineNum}
                    backToHome={backToHomeOnClick}
                ></Board>
            ) : (
                <HomePage
                    startGameOnClick={startGameOnClick}
                    mineNumOnChange={mineNumOnChange}
                    boardSizeOnChange={boardSizeOnChange}
                    mineNum={mineNum}
                    boardSize={boardSize}
                    error={error}
                ></HomePage>
            )}
            {/* Advanced TODO: pass all parameters into `Board` and `HomePage`*/}
        </div>
    );
};
export default MineSweeper;
