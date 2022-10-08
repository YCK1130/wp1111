import React, { useEffect, useState } from "react";
import "../styles/containers/Root.css";
import Main from "./Main";
import Footer from "./Footer";
import Header from "../components/Header";

const Root = () => {
    const [viewpoint, setViewpoint] = useState("default");
    const [todoNum, setTodoNum] = useState(0);
    const [todoList, setTodoList] = useState([]);
    useEffect(() => {
        setTodoNum(
            todoList.filter((todo) => {
                return !todo.completed;
            }).length
        );
    }, [todoList]);
    return (
        <div className="todo-app__root">
            <Header></Header>
            <Main
                viewpoint={viewpoint}
                setTodoNum={setTodoNum}
                todoNum={todoNum}
                setTodoList={setTodoList}
                todoList={todoList}
            ></Main>
            <Footer
                setViewpoint={setViewpoint}
                setTodoNum={setTodoNum}
                todoNum={todoNum}
                setTodoList={setTodoList}
                todoList={todoList}
            ></Footer>
        </div>
    );
};
export default Root;
