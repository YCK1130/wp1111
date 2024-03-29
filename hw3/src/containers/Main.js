import React, { useState } from "react";
import "../styles/containers/Main.css";
import Input from "../components/Input";
import List from "./List";
const dataTemplate = {
    id: "1",
    text: "Hello",
    completed: false,
};

const Main = (props) => {
    const { setTodoNum, todoList, setTodoList, viewpoint } = props;
    const [todoId, setTodoId] = useState(1);
    const handleInput = (event) => {
        event.preventDefault();
        if (document.getElementById("form")[0].value.trim() === "") {
            document.getElementById("form")[0].value = "";
            alert("You didn't enter any thing");
            return;
        }
        let newTodo = Object.assign({}, dataTemplate);
        newTodo.id = `${todoId}`;
        newTodo.text = document.getElementById("form")[0].value.trim();
        let tempList = Object.assign([], todoList);
        tempList.push(newTodo);
        setTodoList(tempList);
        setTodoNum(
            todoList.filter((todo) => {
                return !todo.completed;
            }).length + 1
        );
        setTodoId(todoId + 1);

        document.getElementById("form")[0].value = "";
    };

    if (todoList.length === 0) {
        return (
            <div className="todo-app__main">
                <form name="form" id="form" onSubmit={handleInput}>
                    <Input id="todo-input"></Input>
                </form>
            </div>
        );
    }
    let passList;
    if (viewpoint === "Active") {
        passList = todoList.filter((item) => item.completed !== true);
    } else if (viewpoint === "Completed") {
        passList = todoList.filter((item) => item.completed === true);
    } else {
        passList = todoList;
    }

    return (
        <div className="todo-app__main">
            <form name="form" id="form" onSubmit={handleInput}>
                <Input id="todo-input"></Input>
            </form>
            <List
                data={passList}
                todoList={todoList}
                setTodoNum={setTodoNum}
                todoNum={props.todoNum}
                setTodoList={props.setTodoList}
            ></List>
        </div>
    );
};

export default Main;
