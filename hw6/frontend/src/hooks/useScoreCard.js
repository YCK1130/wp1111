import { createContext, useContext, useState } from "react";

const ADD_MESSAGE_COLOR = "#3d84b8";
const REGULAR_MESSAGE_COLOR = "#2b2e4a";
const ERROR_MESSAGE_COLOR = "#fb3640";

const ScoreCardContext = createContext({
    messages: [],

    addCardMessage: () => {},
    addRegularMessage: () => {},
    addErrorMessage: () => {},
    clearMessage: () => {},
});

const makeMessage = (message, color) => {
    return { message, color };
};

const ScoreCardProvider = (props) => {
    const [messages, setMessages] = useState([]);

    const addCardMessage = (message) => {
        setMessages([makeMessage(message, ADD_MESSAGE_COLOR), ...messages]);
    };

    const addRegularMessage = (...ms) => {
        setMessages([
            ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
            ...messages,
        ]);
    };
    const clearMessage = (m) => {
        let message = makeMessage(m, REGULAR_MESSAGE_COLOR);
        setMessages([message]);
    };
    const addErrorMessage = (message) => {
        setMessages([makeMessage(message, ERROR_MESSAGE_COLOR), ...messages]);
    };

    return (
        <ScoreCardContext.Provider
            value={{
                messages,
                addCardMessage,
                addRegularMessage,
                addErrorMessage,
                clearMessage,
            }}
            {...props}
        />
    );
};

function useScoreCard() {
    return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
