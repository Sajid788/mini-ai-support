import { useEffect, useRef } from "react";
import Loader from "./Loader";
import MessageContent from "./MessageContent";

const SOURCE_CONFIG = {
  RULE: { label: "Rule Engine", style: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20" },
  CACHE: { label: "Semantic Cache", style: "bg-amber-500/10 text-amber-700 ring-amber-500/20" },
  LLM: { label: "AI Response", style: "bg-indigo-500/10 text-indigo-700 ring-indigo-500/20" },
};

function BotAvatar() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/25">
      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-md shadow-slate-900/20">
      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    </div>
  );
}

function SourceBadge({ source }) {
  if (!source) return null;

  const config = SOURCE_CONFIG[source] || {
    label: source,
    style: "bg-slate-500/10 text-slate-600 ring-slate-500/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide ring-1 ring-inset ${config.style}`}
    >
      {config.label}
    </span>
  );
}

export default function MessageList({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6 sm:px-6">
      {messages.length === 0 && !loading && (
        <div className="flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v10.965Z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900">How can we help you today?</h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Ask about refunds, shipping, pricing, passwords, or support hours — or anything else you need.
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
        >
          {msg.role === "user" ? <UserAvatar /> : <BotAvatar />}

          <div
            className={`min-w-0 max-w-[88%] sm:max-w-[78%] ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            {msg.role === "assistant" && !msg.error && (
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">Support Agent</span>
                <SourceBadge source={msg.source} />
              </div>
            )}

            <div
              className={
                msg.role === "user"
                  ? "rounded-2xl rounded-tr-md bg-gradient-to-br from-indigo-600 to-violet-600 px-5 py-4 shadow-lg shadow-indigo-500/20"
                  : msg.error
                    ? "rounded-2xl rounded-tl-md border border-red-200 bg-red-50 px-5 py-4 shadow-sm"
                    : "rounded-2xl rounded-tl-md border border-slate-200/80 bg-white px-5 py-4 shadow-md shadow-slate-200/60 ring-1 ring-slate-100"
              }
            >
              {msg.error ? (
                <p className="text-sm leading-relaxed text-red-700">{msg.content}</p>
              ) : (
                <MessageContent content={msg.content} variant={msg.role} />
              )}
            </div>
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex gap-3">
          <BotAvatar />
          <div className="rounded-2xl rounded-tl-md border border-slate-200/80 bg-white px-2 py-1 shadow-md shadow-slate-200/60 ring-1 ring-slate-100">
            <Loader label="Generating response..." />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
