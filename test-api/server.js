import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import User from "./models/user";
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.post("/users", (req, res) => {
    res.send("POST HTTP method on users resource");
});

app.put("/users/:userId", (req, res) => {
    res.send(`PUT HTTP method on users/${req.params.userId} resource`);
});

app.get("/", (req, res) => {
    res.send("Received a GET HTTP method");
});
app.post("/", (req, res) => {
    console.log(req.body);
    res.send("Received a POST HTTP method");
});
app.put("/", (req, res) => {
    res.send("Received a PUT HTTP method");
});
app.delete("/", (req, res) => {
    res.send("Received a DELETE HTTP method");
});
app.get("/", (req, res) => {
    res.send("Hello, World!!");
    console.log("hello world");
});

const saveUser = async (id, name) => {
    const existing = await User.findOne({ name });
    if (existing) throw new Error(`data ${name} exists!!`);
    try {
        const newUser = new User({ id, name });
        console.log("Created user", newUser);
        return newUser.save();
    } catch (e) {
        throw new Error("User creation error: " + e);
    }
};
const deleteDB = async () => {
    try {
        await User.deleteMany({});
        console.log("Database deleted");
    } catch (e) {
        throw new Error("Database deletion failed");
    }
};

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {
    await deleteDB();
    await saveUser(57, "Ric");
    await saveUser(108, "Sandy");
    await saveUser(77, "Peter");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
