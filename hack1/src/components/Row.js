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
    let fiveArr = [...Array(5)];
    let displayArr = guess ? guess : fiveArr;
    return (
        <div className="Row-container">
            {/* TODO 3: Row Implementation -- Row */}

            {/* ↓ Default row, you should modify it. ↓ */}
            <div className="Row-wrapper">
                {displayArr.map((cell, index) => {
                    return (
                        <div
                            id={rowIdx.toString() + "-" + index.toString()}
                            key={rowIdx.toString() + "-" + index.toString()}
                            className={
                                "Row-wordbox" + (cell ? ` ${cell.color}` : "")
                            }
                        >
                            {cell ? ` ${cell.char}` : ""}
                        </div>
                    );
                })}
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    );
};

export default Row;
