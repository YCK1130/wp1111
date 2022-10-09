/****************************************************************************
  FileName      [ Modal.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Modal component. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Modal.css";
import React, { useEffect, useState } from "react";
let timeOutID;
export default function Modal({ restartGame, backToHome, win }) {
    const [render, setRender] = useState(false);
    useEffect(() => {
        timeOutID = setTimeout(() => {
            setRender(true);
        }, 1000);

        return clearTimeout(timeOutID);
    }, []);
    // let display = win ? { display: 1 } : { opacity: 1 };
    return (
        // Advanced TODO: Implement the structure of Modal
        // Useful Hint: style = {{opacity: 1 or 0 }}
        <div className="modal">
            <div className="modalWrapper"></div>
            <div className="modalContent">
                <div className="modalResult">
                    {win ? "WIN" : "Game Over"}
                </div>
                <div className="modalBtnWrapper">
                    <div className="modalBtn" onClick={restartGame}>
                        {win ? "New Game" : "Try again"}
                    </div>
                    <div className="modalBtn" onClick={backToHome}>
                        Back to Home
                    </div>
                </div>
            </div>
            <div className="modalWrapper"></div>
        </div>
    );
}
