import { useEffect, useState, createContext, useContext } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useUserData } from "../hooks/useUserData";

import {
    CHATBOX_QUERY,
    CREATE_CHATBOX_MUTATION,
    CREATE_MESSAGE_MUTATION,
    MESSAGE_SUBSCRIPTION,
} from "../graphql";
const ChatData = createContext({
    status: [],
    messages: {},
    chatBoxes: [],
    changedChatBoxes: {},
    handleUnSub: () => {},
    setChangedChatBoxes: () => {},
    setChatBoxes: () => {},
    sendMessage: () => {},
    startChat: () => {},
    getChatBox: () => {},
});
const makeName = (name, to) => {
    return [name, to].sort().join("_");
};
const ChatProvider = (props) => {
    // define states
    const { userName, friend } = useUserData();

    // const { userName, activeKey, setMsgSent } = props;
    const me = userName;
    // const friend = activeKey;
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [unSubFunc, setUnSubFunc] = useState({});
    const [chatBoxes, setChatBoxes] = useState([]);
    const [changedChatBoxes, setChangedChatBoxes] = useState({});
    // console.log(me, friend);
    const [getChatBox, { data, loading, subscribeToMore, error, refetch }] =
        useLazyQuery(CHATBOX_QUERY, {
            variables: {
                name1: userName,
                name2: friend,
            },
        });
    if (error) console.log(JSON.stringify(error, null, 2));
    // else console.log(data, loading);
    // useEffect(() => {
    //     getChatBox({
    //         variables: {
    //             name1: userName,
    //             name2: friend,
    //         },
    //     });
    // }, [friend]);
    useEffect(() => {
        if (loading) return;
        // console.log(data?.chatbox?.messages);
        const msgs = data?.chatbox?.messages.map((msg) => ({
            name: msg.sender,
            body: msg.body,
        }));
        console.log("data changing");
        console.log(msgs);
        setMessages(msgs);
        setStatus({
            type: "success",
            msg: "success.",
        });
        // setMsgSent(true);
    }, [data]);

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    useEffect(() => {
        // console.log(makeName(me, friend), unSubFunc[makeName(me, friend)]);
        // if (unSubFunc[0]) unSubFunc[0]();
        console.log("get ", makeName(userName, friend));
        if (changedChatBoxes[makeName(userName, friend)]) {
            console.log("refetching...");
            refetch({
                name1: userName,
                name2: friend,
            });
        }
        // getChatBox();
        if (unSubFunc[makeName(me, friend)]) return;
        try {
            const unSub = subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { from: me, to: friend },
                updateQuery: (prev, { subscriptionData }) => {
                    // console.log(subscriptionData);
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message;
                    // console.log()
                    console.log("newMessage", newMessage);
                    console.log("prev", prev);
                    if (
                        prev.chatbox.name !==
                        makeName(newMessage.to, newMessage.sender)
                    ) {
                        const newChange = Object.assign({}, changedChatBoxes);
                        newChange[
                            makeName(newMessage.to, newMessage.sender)
                        ] = true;
                        console.log(
                            `***Marking ${makeName(
                                newMessage.to,
                                newMessage.sender
                            )} is changed`
                        );
                        setChangedChatBoxes(newChange);
                        return prev;
                    }
                    return {
                        chatbox: {
                            __typename: prev.chatbox.__typename,
                            name: prev.chatbox.name,
                            messages: [...prev.chatbox.messages, newMessage],
                        },
                    };
                },
            });
            // console.log(unSubFunc);
            const newSet = Object.assign([], unSubFunc);
            newSet[makeName(me, friend)] = () => unSub();
            console.log("newSet", newSet);
            // setUnSubFunc([() => unSub()]);
            setUnSubFunc(newSet);
            refetch({
                name1: userName,
                name2: friend,
            });
        } catch (e) {
            console.log(JSON.stringify(e, null, 2));
        }
    }, [friend]);

    const handleUnSub = (me, friend) => {
        console.log("unSubscribing ", makeName(me, friend));
        unSubFunc[makeName(me, friend)]();
        delete unSubFunc[makeName(me, friend)];
    };
    return (
        <ChatData.Provider
            value={{
                status: status,
                messages: messages,
                chatBoxes: chatBoxes,
                setChatBoxes: setChatBoxes,
                changedChatBoxes: changedChatBoxes,
                handleUnSub: handleUnSub,
                setChangedChatBoxes: setChangedChatBoxes,
                sendMessage: sendMessage,
                startChat: startChat,
                getChatBox: getChatBox,
            }}
            {...props}
        ></ChatData.Provider>
    );
    // return {
    //     status,
    //     messages,
    //     sendMessage,
    //     startChat,
    //     getChatBox,
    // };
};
const useChatData = () => {
    return useContext(ChatData);
};

export { ChatProvider, useChatData };
// export default ChatProvider;
