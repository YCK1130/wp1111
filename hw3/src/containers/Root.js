import React, { useState } from "react";
import "../styles/containers/Root.css";
import Main from "./Main";
import Footer from "./Footer";
import Header from "../components/Header";

const Root = () => {
    const [todoNum, setTodoNum] = useState(0);
    const [todoList, setTodoList] = useState([]);
    return (
        <div className="todo-app__root">
            <Header></Header>
            <Main
                viewpoint="default"
                setTodoNum={setTodoNum}
                todoNum={todoNum}
                setTodoList={setTodoList}
                todoList={todoList}
            ></Main>
            <Footer
                setTodoNum={setTodoNum}
                todoNum={todoNum}
                setTodoList={setTodoList}
                todoList={todoList}
            ></Footer>
        </div>
    );
};
export default Root;
