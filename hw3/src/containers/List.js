import React from "react";
import "../styles/containers/List.css";
import Todo from "../components/Todo";
const List = (props) => {
    // console.log(props.data);
    return (
        <ul className="todo-app__list">
            {props.data.map((value) => {
                return (
                    <Todo
                        data={value}
                        key={`todo${value.id}`}
                        setTodoNum={props.setTodoNum}
                        todoNum={props.todoNum}
                        todoList={props.data}
                        setTodoList={props.setTodoList}
                    ></Todo>
                );
            })}
        </ul>
    );
};

export default List;
