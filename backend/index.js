import "dotenv/config";
import express from "express";
import cors from "cors";
import { connection, PORT } from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import chatRouter from "./routes/chat.routes.js";
import statsRouter from "./routes/stats.routes.js";

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRouter);
app.use("/api/stats", statsRouter);

app.get("/", (_req, res) => {
  res.json({ message: "Mini AI Support Agent API is running" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, async () => {
  try {
    await connection;
    await connectRedis();
    console.log("Connected to database");
  } catch (error) {
    console.log("Database connection error:", error.message);
  }
  console.log(`Server running on port ${PORT}`);
});