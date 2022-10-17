import { useState } from "react";
import "./App.css";

function App() {
    const [hasStarted, setHasStarted] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [number, setNumber] = useState("");
    const [status, setStatus] = useState("");

    const handleGuess = () => {};
    const handleStart = () => {};

    const startMenu = (
        <div>
            <button onClick={handleStart}> start game </button>
        </div>
    );
    const gameMode = (
        <>
            <p>Guess a number between 1 to 100</p>
            <input // Get the value from input
            ></input>
            <button // Send number to backend
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
            >
                restart
            </button>
        </>
    );
    return <div className="App">{hasStarted ? gameMode : startMenu}</div>;
}

export default App;
