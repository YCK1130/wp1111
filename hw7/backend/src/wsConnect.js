import Message from "./models/message";
const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
};
const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
};
const initData = (ws) => {
    Message.find()
        .sort({ created_at: -1 })
        .limit(100)
        .exec((err, res) => {
            if (err) throw err;
            // initialize app with existing messages
            console.log(res);
            sendData(["init", res], ws);
        });
};
export default {
    initData: (ws) => {
        console.log("init Data");
        initData(ws);
    },
    onMessage: (ws) =>
        ws.on("message", async (byteString) => {
            const data = byteString;
            const [task, payload] = JSON.parse(data);
            console.log(task);
            switch (task) {
                case "input": {
                    const { name, body } = payload;
                    // Save payload to DB
                    const message = new Message({ name, body });
                    try {
                        await message.save();
                    } catch (e) {
                        sendStatus(
                            {
                                type: "error",
                                msg: "Message DB save error: " + e,
                            },
                            ws
                        );
                        break;
                        // throw new Error("Message DB save error: " + e);
                    }
                    // Respond to client
                    sendData(["output", [payload]], ws);
                    sendStatus(
                        {
                            type: "success",
                            msg: "Message sent.",
                        },
                        ws
                    );
                    break;
                }
                case "init": {
                    initData(ws);
                    break;
                }
                case "clear": {
                    Message.deleteMany({}, () => {
                        sendData(["cleared"], ws);
                        sendStatus(
                            { type: "success", msg: "Message cache cleared." },
                            ws
                        );
                    });
                    break;
                }
                default:
                    break;
            }
        }),
};
