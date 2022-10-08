import React, { useState } from "react";
import x_img from "../img/x.png";
import "../styles/components/Todo.css";

const Todo = (props) => {
    // console.log(props.data.id);
    const [useStatus, setStatus] = useState(props.data.completed);
    const todoList = props.todoList;
    const setTodoList = props.setTodoList;
    const handleClick = () => {
        props.data.completed = !props.data.completed;
        setStatus(props.data.completed);
        props.setTodoNum(props.todoNum - (2 * props.data.completed - 1));
    };

    const handleDel = () => {
        setTodoList(todoList.filter((item) => item.id !== props.data.id));
    };

    if (useStatus) {
        return (
            <li
                className="todo-app__item"
                style={{ textDecorationLine: "line-through", opacity: 0.5 }}
            >
                <div className="todo-app__checkbox">
                    <input
                        type="checkbox"
                        id={`${props.data.id}`}
                        className="todo-item-input"
                        checked={useStatus}
                        onChange={handleClick}
                    ></input>
                    <label htmlFor={`${props.data.id}`}></label>
                </div>
                <h1 className="todo-app__item-detail">{props.data.text}</h1>
                <img
                    src={x_img}
                    alt="x"
                    className="todo-app__item-x"
                    onClick={handleDel}
                ></img>
            </li>
        );
    }
    return (
        <li className="todo-app__item">
            <div className="todo-app__checkbox">
                <input
                    type="checkbox"
                    id={`${props.data.id}`}
                    className="todo-item-input"
                    checked={useStatus}
                    onChange={handleClick}
                ></input>
                <label htmlFor={`${props.data.id}`}></label>
            </div>
            <h1 className="todo-app__item-detail">{props.data.text}</h1>
            <img
                src={x_img}
                alt="x"
                className="todo-app__item-x"
                onClick={handleDel}
            ></img>
        </li>
    );
};

export default Todo;
