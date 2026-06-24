import Groq from "groq-sdk";

const getGroqClient = () => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey ) {
    throw new Error("GROQ_API_KEY missing");
  }

  return new Groq({ apiKey });
};

export const generateSupportResponse = async (query) => {
  try {
    const client = getGroqClient();
    const completion = await client.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful customer support assistant. Give short and clear answers.",
        },
        {
          role: "user",
          content: query,
        },
      ],
      temperature: 0.2,
    });

    const answer =
      completion.choices[0]?.message?.content?.trim() ||
      "Sorry, I could not generate a response.";

    return {
      answer,
      cost: 0,
      usage: completion.usage || null,
    };
  } catch (error) {
    console.error("Groq Error:", error.message);
    throw error;
  }
};
