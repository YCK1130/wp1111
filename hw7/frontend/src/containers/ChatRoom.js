import { Button, Input, message } from "antd";
import useChat from "../hooks/useChat";
import { useUserData } from "../hooks/useUserData";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Title from "../components/Title";
import Message from "../components/Message";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`;
const ChatBox = styled.div`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;
const FootRef = styled.div`
    height: 20px;
`;
const displayStatus = (s) => {
    if (s.msg) {
        const { type, msg } = s;
        const content = {
            content: msg,
            duration: type === "error" ? 2 : type === "fatal error" ? 5 : 0.5,
        };
        console.log(content, type);
        switch (type) {
            case "success":
                message.success(content);
                break;
            case "info":
                message.info(content);
                break;
            case "error":
            default:
                message.error(content);
                break;
        }
    }
};
function ChatRoom({ user }) {
    const { userName, setNowUser, setLogOut } = useUserData();
    const [body, setBody] = useState("");
    const bodyRef = useRef(null);
    const RoomBottomRef = useRef(null);
    const [msgSent, setMsgSent] = useState(false);
    const { status, messages, sendMessage, clearMessages, askInit } =
        useChat(setMsgSent);
    useEffect(() => {
        askInit(setMsgSent);
    }, []);
    useEffect(() => {
        displayStatus(status);
    }, [status]);

    const scrollToBottom = () => {
        RoomBottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    const displayMessages = () => {
        return messages.length === 0 ? (
            <p style={{ color: "#ccc" }}> No messages... </p>
        ) : (
            messages.map(({ name, body }, i) => (
                <Message
                    key={i}
                    name={name}
                    body={body}
                    user={userName}
                ></Message>
            ))
        );
    };
    const handleLogOut = () => {
        setLogOut();
    };
    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent]);

    return (
        <Wrapper>
            <Title name={user}>
                <Button type="primary" onClick={clearMessages} danger>
                    Clear
                </Button>
                <Button
                    type="primary"
                    onClick={() => handleLogOut()}
                    style={{ marginLeft: "10px" }}
                >
                    Log Out
                </Button>
            </Title>
            <ChatBox>
                {displayMessages()}
                <FootRef ref={RoomBottomRef} />
            </ChatBox>
            <Input.Search
                ref={bodyRef}
                enterButton="Send"
                placeholder="Type a message here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onSearch={(msg) => {
                    if (userName === "") {
                        displayStatus({
                            type: "error",
                            msg: "Please Enter UserName!",
                        });
                        return;
                    }
                    if (msg === "") {
                        displayStatus({
                            type: "error",
                            msg: "You didn't enter any message!",
                        });
                        return;
                    }
                    sendMessage({ name: userName, body: msg });
                    setBody("");
                    setMsgSent(true);
                }}
                autoFocus
            ></Input.Search>
        </Wrapper>
    );
}

export { displayStatus };
export default ChatRoom;
