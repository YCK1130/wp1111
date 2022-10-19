import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:4000/api/guess" });
const startGame = async () => {
    const {
        data: { msg },
    } = await instance.post("/start");
    return msg;
};
const guess = async (number) => {
    try {
        const {
            data: { msg },
        } = await instance.get("/guess", { params: { number } });
        return msg;
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
};
const restart = async () => {
    const {
        data: { msg },
    } = await instance.post("/start");
    return msg;
};
export { startGame, guess, restart };
