import mongoose from "mongoose";
const Schema = mongoose.Schema;

/******* ChatBox Schema *******/
const ChatBoxSchema = new Schema({
    name: { type: String, required: [true, "Name field is required."] },
    messages: [
        {
            sender: { type: String },
            body: { type: String },
            to: { type: String },
        },
    ],
});
const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema);

export { ChatBoxModel };
