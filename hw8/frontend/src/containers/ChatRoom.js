import { Button, Input, message, Tabs } from "antd";
import { useChatData } from "../hooks/useChat";
import { useUserData } from "../hooks/useUserData";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Title from "../components/Title";
import Message from "../components/Message";
import ChatModal from "../components/ChatModal";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const makeName = (name, to) => {
    return [name, to].sort().join("_");
};
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`;
const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 70vh;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;
const ChatBox = styled.div`
    width: 100%;
    height: 55vh;
    background: #eeeeee52;
    padding: 10px;
    overflow: auto;
`;
const FootRef = styled.div`
    height: 40px;
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
    const { userName, setLogOut, setFriend } = useUserData();
    const [body, setBody] = useState("");
    const bodyRef = useRef(null);
    const RoomBottomRef = useRef({});
    const [msgSent, setMsgSent] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    // const [chatBoxes, setChatBoxes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const {
        status,
        messages,
        sendMessage,
        startChat,
        getChatBox,
        chatBoxes,
        changedChatBoxes,
        setChangedChatBoxes,
        setChatBoxes,
        handleUnSub,
    } = useChatData();
    // useEffect(() => {
    //     askInit(setMsgSent);
    // }, []);
    useEffect(() => {
        displayStatus(status);
    }, [status]);

    const scrollToBottom = () => {
        // console.log("scroll to butt", activeKey);

        RoomBottomRef.current[activeKey]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    const displayMessages = (chat) => {
        return chat.length === 0 ? (
            <p style={{ color: "#ccc" }}> No messages... </p>
        ) : (
            chat.map(({ name, body }, i) => (
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
    useEffect(() => {
        const newChatBoxes = chatBoxes.map(({ label, children, key }) => {
            return {
                label,
                children: activeKey === label ? extractChat(label) : children,
                key,
            };
        });
        const newChange = Object.assign({}, changedChatBoxes);
        newChange[makeName(activeKey, userName)] = false;
        setChangedChatBoxes(newChange);
        setChatBoxes(newChatBoxes);

        scrollToBottom();
    }, [messages]);
    useEffect(() => {
        setFriend(activeKey);
        if (activeKey !== "") {
            startChat({ variables: { name1: userName, name2: activeKey } });
            getChatBox({
                variables: {
                    name1: userName,
                    name2: activeKey,
                },
            });
        }
        scrollToBottom();
    }, [activeKey]);

    const renderChat = (chat, friend) => {
        console.log("msg", messages);
        const chid = (
            <ChatBox>
                {displayMessages(chat)}
                <FootRef ref={(el) => (RoomBottomRef.current[friend] = el)} />
            </ChatBox>
        );

        return chid;
    }; // 產⽣ chat 的 DOM nodes
    const extractChat = (friend) => {
        return renderChat(
            messages.filter(
                ({ name, body }) => name === friend || name === userName
            ),
            friend
        );
    };

    const createChatBox = (friend) => {
        if (chatBoxes.some(({ key }) => key === friend)) {
            throw new Error(friend + "'s chat box has already opened.");
        }
        startChat({ variables: { name1: userName, name2: friend } });
        const chat = extractChat(friend);
        setChatBoxes([
            ...chatBoxes,
            { label: friend, children: chat, key: friend },
        ]);
        const newChange = Object.assign({}, changedChatBoxes);
        newChange[makeName(friend, userName)] = false;
        setChangedChatBoxes(newChange);
        setMsgSent(true);
        return friend;
    };
    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({ key }) => key === activeKey);
        const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey);
        setChatBoxes(newChatBoxes);

        const newChange = Object.assign({}, changedChatBoxes);
        delete newChange[makeName(targetKey, userName)];
        setChangedChatBoxes(newChange);

        handleUnSub(userName, targetKey);
        // console.log(targetKey, activeKey, index);
        return activeKey !== ""
            ? activeKey === targetKey
                ? index === 0
                    ? newChatBoxes.length === 0
                        ? ""
                        : newChatBoxes[0].key
                    : chatBoxes[index - 1].key
                : activeKey
            : "";
    };
    return (
        <Wrapper>
            <Title name={user}>
                <Button
                    type="primary"
                    onClick={
                        () => console.log("clear not done")
                        // clearChatBox({ name: userName, to: activeKey })
                    }
                    danger
                >
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
            <>
                <ChatBoxesWrapper
                    type="editable-card"
                    onChange={(key) => {
                        setActiveKey(key);
                        // extractChat(key);
                    }}
                    onEdit={(targetKey, action) => {
                        if (action === "add") setModalOpen(true);
                        else if (action === "remove") {
                            setActiveKey(removeChatBox(targetKey, activeKey));
                        }
                    }}
                    items={chatBoxes}
                    activeKey={activeKey}
                ></ChatBoxesWrapper>
                <ChatModal
                    open={modalOpen}
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(name));
                        // extractChat(name);
                        setModalOpen(false);
                    }}
                    onCancel={() => {
                        setModalOpen(false);
                    }}
                />
            </>
            <Input.Search
                ref={bodyRef}
                enterButton="Send"
                placeholder="Type a message here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onSearch={async (msg) => {
                    if (activeKey === "") {
                        displayStatus({
                            type: "error",
                            msg: "Please select a chat room first!",
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
                    sendMessage({
                        variables: {
                            name: userName,
                            to: activeKey,
                            body: msg,
                        },
                    });
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
