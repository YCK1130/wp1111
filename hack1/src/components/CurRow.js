/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from "react";

const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split("");
    // console.log(letters);
    let fiveArr = [...Array(5)];
    // console.log(fiveArr);
    return (
        <div className="Row-container current">
            {/* TODO 3: Row Implementation -- CurRow */}

            {/* ↓ Default row, you should modify it. ↓ */}
            <div className="Row-wrapper current">
                {fiveArr.map((item, index) => {
                    // console.log(index);
                    return (
                        <div
                            id={rowIdx.toString() + "-" + index.toString()}
                            key={rowIdx.toString() + "-" + index.toString()}
                            className={
                                "Row-wordbox" +
                                (letters[index] ? " filled" : "")
                            }
                        >
                            {letters[index] ? letters[index] : ""}
                        </div>
                    );
                })}
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    );
};

export default CurRow;
