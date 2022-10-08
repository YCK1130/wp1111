import React from "react";
import "../styles/containers/Footer.css";

const Footer = (props) => {
    if (props.todoList.length === 0) return;
    const { setViewpoint, todoNum, setTodoList, todoList } = props;

    const setDefault = () => {
        setViewpoint("default");
    };
    const setActive = () => {
        setViewpoint("Active");
    };
    const setCompleted = () => {
        setViewpoint("Completed");
    };
    const clearCompleted = () => {
        setTodoList(todoList.filter((item) => item.completed === false));
    };
    if (
        todoList.filter((todo) => {
            return todo.completed;
        }).length === 0
    ) {
        return (
            <footer className="todo-app__footer">
                <div className="todo-app__total">{todoNum} left</div>
                <ul className="todo-app__view-buttons">
                    <button id="default" onClick={setDefault}>
                        All
                    </button>
                    <button id="Active" onClick={setActive}>
                        Active
                    </button>
                    <button id="Completed" onClick={setCompleted}>
                        Completed
                    </button>
                </ul>
                <div className="todo-app__clean">
                    <button
                        id="clearButt"
                        disabled={true}
                        style={{ opacity: 0, cursor: "default" }}
                    >
                        Clean Completed
                    </button>
                </div>
            </footer>
        );
    }
    return (
        <footer className="todo-app__footer">
            <div className="todo-app__total">{todoNum} left</div>
            <ul className="todo-app__view-buttons">
                <button id="default" onClick={setDefault}>
                    All
                </button>
                <button id="Active" onClick={setActive}>
                    Active
                </button>
                <button id="Completed" onClick={setCompleted}>
                    Completed
                </button>
            </ul>
            <div className="todo-app__clean">
                <button id="clearButt" onClick={clearCompleted}>
                    Clean Completed
                </button>
            </div>
        </footer>
    );
};

export default Footer;
