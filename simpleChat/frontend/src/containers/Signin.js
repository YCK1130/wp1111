import { Button, Input, message } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { useUserData } from "../hooks/useUserData";
import { displayStatus } from "../containers/ChatRoom";
import Title from "../components/Title";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 350px;
    margin: auto;
`;
const SignIn = () => {
    const { setNowUser } = useUserData();
    const [enteredName, setEnteredName] = useState("");
    return (
        <Wrapper>
            <Title></Title>
            <Input.Search
                enterButton="Log In"
                placeholder="Type your name..."
                value={enteredName}
                onChange={(e) => setEnteredName(e.target.value)}
                onSearch={(msg) => {
                    if (enteredName === "") {
                        displayStatus({
                            type: "error",
                            msg: "Please Enter Your Name!",
                        });
                        return;
                    }
                    setNowUser(msg);
                    setEnteredName("");
                }}
                autoFocus
            ></Input.Search>
        </Wrapper>
    );
};

export default SignIn;
