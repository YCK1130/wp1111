import { createContext, useState, useContext } from "react";
const UserData = createContext({
    userName: "",
    setNowUser: () => {},
});

const UserDataProvider = (props) => {
    const [name, setUserName] = useState("");
    const setNowUser = (_name) => {
        setUserName(_name);
    };
    return (
        <UserData.Provider
            value={{
                userName: name,
                setNowUser,
            }}
            {...props}
        ></UserData.Provider>
    );
};
const useUserData = () => {
    return useContext(UserData);
};

export { UserDataProvider, useUserData };
