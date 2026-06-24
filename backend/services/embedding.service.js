const EMBEDDING_SIZE = 64;
export const EMBEDDING_VERSION = 3;

const hashText = (value) => {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
};

export const generateEmbedding = async (text) => {
  const normalizedText = String(text || "").trim().toLowerCase();
  const embedding = new Array(EMBEDDING_SIZE).fill(0);

  if (!normalizedText) {
    return embedding;
  }

  const tokens = normalizedText.split(/\s+/).filter(Boolean);

  for (const token of tokens) {
    const tokenHash = hashText(token);
    const tokenIndex = tokenHash % EMBEDDING_SIZE;

    embedding[tokenIndex] += 1 + token.length / 10;

    for (let index = 0; index < token.length; index += 1) {
      const charCode = token.charCodeAt(index);
      const charIndex = (tokenHash + index + charCode) % EMBEDDING_SIZE;

      embedding[charIndex] += charCode / 2550;
    }

    for (let index = 0; index < token.length - 1; index += 1) {
      const bigram = token.slice(index, index + 2);
      const bigramIndex = hashText(bigram) % EMBEDDING_SIZE;

      embedding[bigramIndex] += 0.35;
    }
  }

  const magnitude = Math.sqrt(
    embedding.reduce((sum, value) => sum + value * value, 0)
  );

  if (!magnitude) {
    return embedding;
  }

  return embedding.map((value) => Number((value / magnitude).toFixed(6)));
};
