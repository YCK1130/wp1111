import React from 'react';
import "../styles/styles.css"
import "../styles/components/Header.css"

const Header = (props)=>{
    return(
        <header className="todo-app__header">
            <div className="todo-app__title">todos</div>
        </header>
    )
};

export default Header;