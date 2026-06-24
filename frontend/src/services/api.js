const API_BASE = 'https://mini-ai-support-w37x.vercel.app'
async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export function sendChatMessage(query) {
  return request("/api/chat", {
    method: "POST",
    body: JSON.stringify({ query }),
  });
}

export function fetchStats() {
  return request("/api/stats");
}
