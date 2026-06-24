import { useCallback, useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import MessageList from "../components/MessageList";
import StatsCard from "../components/StatsCard";
import { fetchStats, sendChatMessage } from "../services/api";

let messageId = 0;
const nextId = () => ++messageId;

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const loadStats = useCallback(async () => {
    try {
      const data = await fetchStats();
      setStats(data);
    } catch {
      setStats(null);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleSend = async (query) => {
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "user", content: query },
    ]);
    setLoading(true);

    try {
      const { source, answer } = await sendChatMessage(query);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", content: answer, source },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          content: err.message || "Failed to get a response.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
      loadStats();
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />
      </div>

      <header className="relative border-b border-white/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/30">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Mini AI Support
              </h1>
              <p className="text-sm text-slate-500">
                Smart routing · Rules → Cache → LLM
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-700">Online</span>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <section className="mb-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Analytics
          </h2>
          <StatsCard stats={stats} loading={statsLoading} />
        </section>

        <section className="flex h-[calc(100vh-17rem)] min-h-[480px] flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/70 shadow-2xl shadow-slate-300/30 backdrop-blur-xl">
          <div className="border-b border-slate-100 px-5 py-3.5">
            <p className="text-sm font-medium text-slate-700">Support Chat</p>
            <p className="text-xs text-slate-400">Responses are formatted for easy reading</p>
          </div>
          <MessageList messages={messages} loading={loading} />
          <ChatBox onSend={handleSend} disabled={loading} />
        </section>
      </main>
    </div>
  );
}
