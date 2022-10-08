import React, { useState, useEffect } from "react";
import "../styles/containers/Main.css";
import Input from "../components/Input";
import List from "./List";
const dataTemplate = {
  id: "1",
  text: "Hello",
  completed: false,
};

const Main = (props) => {
  const setTodoNum = props.setTodoNum;
  const todoList = props.todoList;
  const setTodoList = props.setTodoList;
  const [todoId, setTodoId] = useState(1);
  // console.log(todoList);

  const handleInput = (event) => {
    event.preventDefault();
    let newTodo = Object.assign({}, dataTemplate);
    newTodo.id = `${todoId}`;
    newTodo.text = document.getElementById("form")[0].value;
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
  // console.log(todoList);
  setTodoNum(
    todoList.filter((todo) => {
      return !todo.completed;
    }).length
  );
  if (todoList.length === 0) {
    return (
      <div className="todo-app__main">
        <form name="form" id="form" onSubmit={handleInput}>
          <Input id="todo-input"></Input>
        </form>
      </div>
    );
  }
  return (
    <div className="todo-app__main">
      <form name="form" id="form" onSubmit={handleInput}>
        <Input id="todo-input"></Input>
      </form>
      <List
        data={todoList}
        setTodoNum={setTodoNum}
        todoNum={props.todoNum}
        setTodoList={props.setTodoList}
      ></List>
    </div>
  );
};

export default Main;
