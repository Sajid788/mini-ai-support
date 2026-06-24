import { findCachedResponse, saveCacheEntry } from "./cache.service.js";
import { generateEmbedding } from "./embedding.service.js";
import { generateSupportResponse } from "./llm.service.js";
import { findRuleMatch } from "./rules.service.js";
import { incrementStats } from "./stats.service.js";

export const routeSupportQuery = async (query) => {
  await incrementStats({ totalRequests: 1 });

  const rule = findRuleMatch(query);

  if (rule) {
    await incrementStats({ ruleHits: 1 });

    return {
      source: "RULE",
      answer: rule.answer,
    };
  }

  const embedding = await generateEmbedding(query);
  const cachedResult = await findCachedResponse(embedding);

  if (cachedResult) {
    await incrementStats({ cacheHits: 1 });

    return {
      source: "CACHE",
      answer: cachedResult.response,
    };
  }

  const llmResult = await generateSupportResponse(query);

  await saveCacheEntry({
    query,
    embedding,
    response: llmResult.answer,
  });

  await incrementStats({
    llmCalls: 1,
    totalCost: llmResult.cost,
  });

  return {
    source: "LLM",
    answer: llmResult.answer,
  };
};
