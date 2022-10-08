import React from "react";
import "../styles/styles.css";
import "../styles/components/Input.css";

const Input = () => {
    return (
        <input
            className="todo-app__input"
            placeholder="What needs to be done?"
            autoFocus
        ></input>
    );
};

export default Input;
