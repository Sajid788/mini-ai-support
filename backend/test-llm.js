import "dotenv/config";

const { generateSupportResponse } = await import("./services/llm.service.js");

const result = await generateSupportResponse(
  "I paid but premium feature is locked"
);

console.log(result);
