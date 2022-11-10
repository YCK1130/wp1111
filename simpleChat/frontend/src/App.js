// import "./App.css";
import ChatRoom from "./containers/ChatRoom";
import Signin from "./containers/Signin";
import { useUserData } from "./hooks/useUserData";
const App = () => {
    const { userName } = useUserData();
    return userName === "" ? (
        <Signin></Signin>
    ) : (
        <ChatRoom user={userName}></ChatRoom>
    );
};
export default App;
