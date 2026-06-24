const DEFAULT_PRICING = {
  "llama-3.1-8b-instant": {
    inputPerMillion: 0,
    outputPerMillion: 0,
  },
};

const roundCost = (value) => Number(value.toFixed(6));

export const calculateTokenCost = (usage = {}, model = process.env.GROQ_MODEL) => {
  const pricing = DEFAULT_PRICING[model];

  if (!pricing) {
    return 0;
  }

  const inputTokens = usage.prompt_tokens || 0;
  const outputTokens = usage.completion_tokens || 0;

  const inputCost = (inputTokens / 1_000_000) * pricing.inputPerMillion;
  const outputCost = (outputTokens / 1_000_000) * pricing.outputPerMillion;

  return roundCost(inputCost + outputCost);
};
