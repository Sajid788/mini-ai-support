import { Router } from "express";
import { handleChatRequest } from "../controller/chat.controller.js";

const chatRouter = Router();

chatRouter.post("/", handleChatRequest);

export default chatRouter;
