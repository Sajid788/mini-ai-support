import Cache from "../models/cache.model.js";
import { EMBEDDING_VERSION } from "./embedding.service.js";
import { cosineSimilarity } from "../utils/cosineSimilarity.js";

const DEFAULT_THRESHOLD = Number(process.env.SIMILARITY_THRESHOLD);

export const findCachedResponse = async (embedding) => {
  const cacheEntries = await Cache.find(
    { embeddingVersion: EMBEDDING_VERSION },
    { query: 1, response: 1, embedding: 1 }
  )
    .sort({ createdAt: -1 })
    .lean();

  let bestMatch = null;
  let highestScore = 0;

  for (const entry of cacheEntries) {
    const score = cosineSimilarity(embedding, entry.embedding);

    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  if (!bestMatch || highestScore < DEFAULT_THRESHOLD) {
    return null;
  }

  return {
    query: bestMatch.query,
    response: bestMatch.response,
    similarity: Number(highestScore.toFixed(4)),
  };
};

export const saveCacheEntry = async ({ query, embedding, response }) => {
  return Cache.create({
    query,
    embedding,
    embeddingVersion: EMBEDDING_VERSION,
    response,
  });
};
