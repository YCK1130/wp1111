import React from "react";
import "../styles/containers/Footer.css";

const Footer = (props) => {
    if (props.todoList.length === 0) return;

    return (
        <footer className="todo-app__footer">
            <div className="todo-app__total">{props.todoNum} left</div>
            <ul className="todo-app__view-buttons">
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </ul>
            <div className="todo-app__clean">
                <button>Clean Completed</button>
            </div>
        </footer>
    );
};

export default Footer;
