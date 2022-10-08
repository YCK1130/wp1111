import React from "react";
import "../styles/containers/List.css";
import Todo from "../components/Todo";
const List = (props) => {
    const { setTodoNum, todoList, setTodoList, todoNum } = props;

    return (
        <ul className="todo-app__list">
            {props.data.map((value) => {
                return (
                    <Todo
                        data={value}
                        key={`todo${value.id}`}
                        setTodoNum={setTodoNum}
                        todoNum={todoNum}
                        todoList={todoList}
                        setTodoList={setTodoList}
                    ></Todo>
                );
            })}
        </ul>
    );
};

export default List;
