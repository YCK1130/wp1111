import express from "express";
import getNumber from "../core/getNumber";

const router = express.Router();
var num2guess;
router.post("/start", (_, res) => {
    num2guess = getNumber(); // ⽤亂數產⽣⼀個猜數字的 number，存在 memory DB
    res.json({ msg: "The game has started." });
});
router.get("/guess", (req, res) => {
    // 去 (memory) DB 拿答案的數字
    // ⽤ req.query.number 拿到前端輸入的數字
    // check if NOT a num or not in range [1,100]
    // 如果有問題 =>
    // res.status(406).send({ msg: 'Not a legal number.' })
    // 如果沒有問題，回傳 status
    const numFromClient = req.query.number;
    if (!/^[0-9]{1,3}/.test(numFromClient)) {
        res.status(406).send({ msg: "Not a legal number." });
        return;
    }
    const testNum = Number(numFromClient);
    // res.status(406).send({ msg: Number(numFromClient) });
    if (testNum > 100 || testNum < 1) {
        res.status(406).send({ msg: "Not a legal number." });
        return;
    }

    if (testNum > num2guess) res.send({ msg: "lower" });
    else if (testNum < num2guess) res.send({ msg: "higher" });
    else if (testNum == num2guess) res.send({ msg: "Equal" });
    else {
        res.status(500).send({ msg: "bug" });
    }
    return;
});
router.post("/restart", (_, res) => {
    num2guess = getNumber(); // ⽤亂數產⽣⼀個猜數字的 number，存在 memory DB
    res.json({ msg: "The game has started." });
});
export default router;
