import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
const router = Router();
const findStudentData = async (queryString, query) => {
    try {
        let dataSet;
        const searchingDict =
            query === "Name" ? { name: queryString } : { subject: queryString };
        dataSet = await ScoreCard.find(searchingDict);

        const message =
            dataSet.length !== 0 ? null : `${query}(${queryString}) not found!`;
        return { dataSet: dataSet, message: message, status: true };
    } catch (e) {
        return {
            dataSet: null,
            message: "Database search failed: " + e,
            status: false,
        };
        // throw new Error("Database deletion failed");
    }
};
router.get("/data", async (req, res) => {
    const { queryString, query } = req.query;
    console.log(queryString, query);
    const { dataSet, message, status } = await findStudentData(
        queryString,
        query
    );
    console.log(dataSet, message);
    res.send({ dataSet: dataSet, message: message });
});

export default router;
