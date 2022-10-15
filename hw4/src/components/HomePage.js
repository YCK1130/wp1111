/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/HomePage.css";
import React, { useState } from "react";

const HomePage = ({
    startGameOnClick,
    mineNumOnChange,
    boardSizeOnChange,
    mineNum,
    boardSize /* -- something more... -- */,
    error,
}) => {
    const [showPanel, setShowPanel] = useState(false); // A boolean variable. If true, the controlPanel will show.
    const [Pane_style, setPaneStyle] = useState({ display: "none" });
    const maxBoardSize = 15;
    {
        /* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */
    }
    const showControlPanel = () => {
        let nowShowPanel = !showPanel;
        setShowPanel(nowShowPanel);
        if (nowShowPanel) setPaneStyle({});
        else setPaneStyle({ display: "none" });
    };
    return (
        <div className="HomeWrapper">
            <p className="title">MineSweeper</p>
            {/* Basic TODO:  Implemen start button */}
            <button className="btn" onClick={startGameOnClick} disabled={error}>
                Start Game
            </button>
            {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
            <div className="controlContainer">
                <button className="btn" onClick={showControlPanel}>
                    Difficulty Adjustment
                </button>
                <div
                    className="controlWrapper"
                    id="controlWrapper"
                    style={Pane_style}
                >
                    <div
                        className="error"
                        style={error ? { color: "#880000" } : { opacity: 0 }}
                    >
                        ERROR: Mines number and board size are invalid!
                    </div>
                    <div className="controlPanel">
                        <div className="controlCol">
                            <p className="controlTitle">Mines Number</p>
                            <input
                                type="range"
                                className="inputSlider"
                                id="mineNumControl"
                                step="1"
                                min="2"
                                // max={`${maxBoardSize * maxBoardSize}`}
                                max="100"
                                defaultValue={`${mineNum}`}
                                onChange={mineNumOnChange}
                            ></input>
                            <p
                                className="controlNum"
                                style={
                                    error
                                        ? { color: "#880000" }
                                        : { color: "#0f0f4b" }
                                }
                            >
                                {mineNum}
                            </p>
                        </div>
                        <div className="controlCol">
                            <p className="controlTitle">Board Size (n x n)</p>
                            <input
                                type="range"
                                className="inputSlider"
                                id="boardSizeControl"
                                step="1"
                                min="3"
                                max={`${maxBoardSize}`}
                                defaultValue={`${boardSize}`}
                                onChange={boardSizeOnChange}
                            ></input>
                            <p
                                className="controlNum"
                                style={
                                    error
                                        ? { color: "#880000" }
                                        : { color: "#0f0f4b" }
                                }
                            >
                                {boardSize}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomePage;
