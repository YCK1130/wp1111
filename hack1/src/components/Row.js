/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from "react";

const Row = ({ guess, rowIdx }) => {
    if (guess != undefined) {
        return (
            <div className="Row-container">
                {/* TODO 3: Row Implementation -- Row */}

                {/* ↓ Default row, you should modify it. ↓ */}
                <div className="Row-wrapper">
                    {guess.map((cell, index) => {
                        return (
                            <div
                                id={rowIdx.toString() + "-" + index.toString()}
                                key={rowIdx.toString() + "-" + index.toString()}
                                className={"Row-wordbox " + cell.color}
                            >
                                {cell.char}
                            </div>
                        );
                    })}
                </div>
                {/* ↑ Default row, you should modify it. ↑ */}
            </div>
        );
    }
    return (
        <div className="Row-container">
            {/* TODO 3: Row Implementation -- Row */}

            {/* ↓ Default row, you should modify it. ↓ */}
            <div className="Row-wrapper">
                <div
                    id={rowIdx.toString() + "-0"}
                    key={rowIdx.toString() + "-0"}
                    className="Row-wordbox"
                ></div>
                <div
                    id={rowIdx.toString() + "-1"}
                    key={rowIdx.toString() + "-1"}
                    className="Row-wordbox"
                ></div>
                <div
                    id={rowIdx.toString() + "-2"}
                    key={rowIdx.toString() + "-2"}
                    className="Row-wordbox"
                ></div>
                <div
                    id={rowIdx.toString() + "-3"}
                    key={rowIdx.toString() + "-3"}
                    className="Row-wordbox"
                ></div>
                <div
                    id={rowIdx.toString() + "-4"}
                    key={rowIdx.toString() + "-4"}
                    className="Row-wordbox"
                ></div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    );
};

export default Row;
