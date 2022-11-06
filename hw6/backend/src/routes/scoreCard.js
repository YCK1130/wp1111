import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
const router = Router();
const saveScore = async (name, subject, score) => {
    const existing = await ScoreCard.findOne({
        name: name,
        subject: subject,
    });
    // // console.log(existing);
    if (existing) {
        try {
            // console.log(`User updated: ${name}, ${subject}, ${score}`);
            const status = await ScoreCard.updateOne(
                { _id: existing._id },
                { $set: { score: score } }
            );
            // // console.log(status);
            return {
                msg: `Updating(${name}, ${subject}, ${score})`,
                status: true,
            };
        } catch (e) {
            return { msg: "User Update Fail: " + e, status: false };
            // throw new Error("User Update Fail: " + e);
        }
    }
    try {
        const newScoreCard = new ScoreCard({ name, subject, score });
        // console.log("Created user", newScoreCard);
        await newScoreCard.save();
        return {
            msg: `Adding(${name}, ${subject}, ${score})`,
            status: true,
        };
    } catch (e) {
        return { msg: "User creation error: " + e, status: false };
        // throw new Error("User creation error: " + e);
    }
};

const deleteDB = async () => {
    try {
        await ScoreCard.deleteMany({});
        // console.log("Database deleted");
        return { msg: "Database cleared", status: true };
    } catch (e) {
        return { msg: "Database deletion failed: " + e, status: false };
        // throw new Error("Database deletion failed");
    }
};
const findDB = async (queryType, queryString) => {
    try {
        let dataSet;
        if (queryType === "name") {
            dataSet = await ScoreCard.find({ name: queryString });
        } else {
            dataSet = await ScoreCard.find({ subject: queryString });
        }
        // console.log(dataSet.length !== 0 ? "Y" : "N");
        const messages =
            dataSet.length !== 0
                ? dataSet.map(
                      (data) =>
                          `Found card with ${queryType}: (${data.name},${data.subject},${data.score})`
                  )
                : null;
        const message =
            dataSet.length !== 0
                ? null
                : `${queryType}(${queryString}) not found!`;
        return { messages: messages, message: message, status: true };
    } catch (e) {
        return {
            messages: null,
            message: "Database search failed: " + e,
            status: false,
        };
        // throw new Error("Database deletion failed");
    }
};
router.delete("/cards", async (req, res) => {
    const { msg, status } = await deleteDB();
    res.send({ message: msg });
});
router.post("/card", async (req, res) => {
    const { name, subject, score } = req.body;
    // // console.log(name, subject, score);
    const { msg, status } = await saveScore(name, subject, score);
    // // console.log(msg, status);
    res.send({ message: msg, card: status });
    // await saveScore("Ken", "Math", 100);
});
router.get("/cards", async (req, res) => {
    // // console.log(req);
    const { type, queryString } = req.query;
    const { messages, message, status } = await findDB(type, queryString);
    res.send({ messages: messages, message: message });

    // console.log(type, queryString);
    // console.log(messages, message);
});
export default router;
