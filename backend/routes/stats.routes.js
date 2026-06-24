import { Router } from "express";
import { getStatsController } from "../controller/stats.controller.js";

const statsRouter = Router();

statsRouter.get("/", getStatsController);

export default statsRouter;
