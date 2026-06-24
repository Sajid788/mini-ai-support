import { routeSupportQuery } from "../services/router.service.js";

export const handleChatRequest = async (req, res, next) => {
  try {
    const { query } = req.body;

    if (typeof query !== "string" || !query.trim()) {
      return res.status(400).json({
        message: "Query is required",
      });
    }

    const result = await routeSupportQuery(query.trim());

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
