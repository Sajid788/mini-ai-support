import { getStats } from "../services/stats.service.js";

export const getStatsController = async (_req, res, next) => {
  try {
    const stats = await getStats();

    return res.status(200).json(stats);
  } catch (error) {
    return next(error);
  }
};
