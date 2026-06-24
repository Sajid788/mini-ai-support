import { createClient } from "redis";

let redisClient;

export const connectRedis = async () => {
  if (redisClient?.isOpen) {
    return redisClient;
  }

  redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on("error", (error) => {
    console.error("Redis connection error:", error.message);
  });

  await redisClient.connect();
  console.log("Redis connected");

  return redisClient;
};

export const getRedisClient = () => redisClient;
