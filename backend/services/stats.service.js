import Stats from "../models/stats.model.js";

const STATS_KEY = "global";

const formatStats = (stats) => ({
  totalRequests: stats.totalRequests || 0,
  ruleHits: stats.ruleHits || 0,
  cacheHits: stats.cacheHits || 0,
  llmCalls: stats.llmCalls || 0,
  totalCost: stats.totalCost || 0,
});

export const getStats = async () => {
  const stats = await Stats.findOneAndUpdate(
    { key: STATS_KEY },
    {
      $setOnInsert: { key: STATS_KEY },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      lean: true,
    }
  );

  return formatStats(stats);
};

export const incrementStats = async (updates = {}) => {
  const stats = await Stats.findOneAndUpdate(
    { key: STATS_KEY },
    {
      $setOnInsert: { key: STATS_KEY },
      $inc: updates,
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      lean: true,
    }
  );

  return formatStats(stats);
};
