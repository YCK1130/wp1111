/****************************************************************************
  FileName      [ Wordle.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Wordle. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Wordle.css";
import Board from "./Board";
import Keyboard from "./Keyboard";
import useWordle from "./hooks/useWordle";
import React, { useEffect, useState } from "react";

const Wordle = ({ solution }) => {
    const {
        turn,
        curGuess,
        guesses,
        isCorrect,
        usedChars,
        handleKeyup,
        printTest,
    } = useWordle(solution);
    const [result, setResult] = useState(
        "You lose!!!! The answer is " + solution + "."
    );
    const [gameOver, setGameOver] = useState(false); // A bool whose default is false. It will be set to turn when the game is ended.
    const [win, setWin] = useState(false); // A bool whose default is false. It will be set to turn when the player wins the game.
    printTest();
    useEffect(() => {
        window.addEventListener("keyup", handleKeyup);
        if (isCorrect) {
            setTimeout(() => {
                // TODO 6: Implementation for the result of the game
                // Hint: Add some conditions in `useEffect` to maintain `result`, `gameOver`, `win`.
                // Result format: "You win!!!!"
                setResult("You win!!!!");
                setGameOver(true);
            });
        } else if (turn > 5) {
            setTimeout(() => {
                // TODO 6: Implementation for the result of the game
                // Hint: Add some conditions in `useEffect` to maintain `result`, `gameOver`, `win`.
                // Result format: "You lose!!!! The answer is windy." (If the solution is 'windy')

                setResult("You lose!!!! The answer is " + solution + ".");
                setGameOver(true);
            });
        }
        return () => window.removeEventListener("keyup", handleKeyup);
    }, [handleKeyup]);

    return (
        <div className="Wordle-container">
            {/* TODO 6: Implementation for the result of the game */}
            <div
                className={
                    (isCorrect ? "Wordle-win" : "Wordle-lose") +
                    (!gameOver ? " Hidden" : "")
                }
            >
                {result}
            </div>
            {/* TODO 2-1:  call `Board` and pass `turn`, `guesses`, `curGuess` into it  */}

            {/* TODO 1-1: call `Keyboard` and pass `usedChars` into it. */}
            <Board turn={turn} guesses={guesses} curGuess={curGuess}></Board>
            <Keyboard usedChars={usedChars}></Keyboard>

            {/* ↓ This button is only for testing! Please remember to comment it before you hand in your hack#1. ↓ */}
            {/* <button className='App-test-btn' onClick={printTest}>TEST</button>       */}
            {/* ↑ This button is only for testing! Please remember to comment it before you hand in your hack#1. ↑ */}
        </div>
    );
};

export default Wordle;
