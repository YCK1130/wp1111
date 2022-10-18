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

                {/* <div
                    id={rowIdx.toString() + "-1"}
                    key={rowIdx.toString() + "-1"}
                    className={"Row-wordbox"+ (letters[1] ? " filled" : "")}
                >
                    {letters[1] ? letters[1] : ""}
                </div>
                <div
                    id={rowIdx.toString() + "-2"}
                    key={rowIdx.toString() + "-2"}
                    className={"Row-wordbox"+ (letters[2] ? " filled" : "")}
                >
                    {letters[2] ? letters[2] : ""}
                </div>
                <div
                    id={rowIdx.toString() + "-3"}
                    key={rowIdx.toString() + "-3"}
                    className="Row-wordbox"
                >
                    {letters[3] ? letters[3] : ""}
                </div>
                <div
                    id={rowIdx.toString() + "-4"}
                    key={rowIdx.toString() + "-4"}
                    className="Row-wordbox"
                >
                    {letters[4] ? letters[4] : ""}
                </div> */}
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    );
};

export default CurRow;
