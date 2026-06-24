import { useState } from "react";

const SUGGESTIONS = [
  "What is your refund policy?",
  "How long does shipping take?",
  "How do I reset my password?",
];

export default function ChatBox({ onSend, disabled }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || disabled) return;

    onSend(trimmed);
    setQuery("");
  };

  const handleSuggestion = (text) => {
    if (disabled) return;
    onSend(text);
  };

  return (
    <div className="border-t border-slate-100 bg-gradient-to-t from-slate-50/90 to-white/90 px-4 py-4 backdrop-blur-sm sm:px-6">
      <div className="mb-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((text) => (
          <button
            key={text}
            type="button"
            onClick={() => handleSuggestion(text)}
            disabled={disabled}
            className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {text}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2.5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything about our support policies..."
          disabled={disabled}
          className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={disabled || !query.trim()}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:from-indigo-300 disabled:to-violet-300 disabled:shadow-none"
        >
          Send
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
        </button>
      </form>
    </div>
  );
}
