import { Router } from "express";
import ScoreCardRouter from "./scoreCard.js";
import StudentData from "./studentData";
const router = Router();
router.use("/", ScoreCardRouter);
router.use("/student/", StudentData);
export default router;
