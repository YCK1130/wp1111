import { useState } from "react";
import { guess, startGame, restart } from "./axios";
import "./Guessor.css";
const Guessor = () => {
    const [hasStarted, setHasStarted] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [number, setNumber] = useState("");
    const [status, setStatus] = useState("");

    const handleGuess = async () => {
        handleInput();
        const response = await guess(number);
        if (response === "Equal") setHasWon(true);
        else {
            setStatus(response);
            setNumber("");
            document.getElementById("numInput").value = "";
        }
    };
    const handleStart = async () => {
        const msg = await startGame();
        if (msg === "The game has started.") setHasStarted(true);
    };
    const handleReStart = async () => {
        const msg = await restart();
        if (msg === "The game has started.") {
            setHasStarted(true);
            setHasWon(false);
            setNumber("");
            setStatus("");
        }
    };
    const handleInput = () => {
        // event.preventDefault();
        setNumber(document.getElementById("numInput").value.trim());
    };

    const startMenu = (
        <div>
            <button onClick={handleStart}> start game </button>
        </div>
    );

    const gameMode = (
        <>
            <p>Guess a number between 1 to 100</p>
            {/* <form name="form" id="form" onSubmit={handleInput}> */}
            <input // Get the value from input
                id="numInput"
                onChange={handleInput}
                autoFocus
            ></input>

            <button // Send number to backend
                id="send"
                onClick={handleGuess}
                disabled={!number}
            >
                guess!
            </button>
            <p>{status}</p>
        </>
    );
    const winningMode = (
        <>
            <p>you won! the number was {number}.</p>
            <button // Handle restart for backend and frontend
                onClick={handleReStart}
            >
                restart
            </button>
        </>
    );

    return (
        <div className="Guess-wrapper">
            {hasStarted ? (hasWon ? winningMode : gameMode) : startMenu}
        </div>
    );
};

export default Guessor;
