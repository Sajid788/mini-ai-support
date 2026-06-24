const SOURCE_CONFIG = {
  totalRequests: { label: "Total Requests", color: "text-slate-800", accent: "from-slate-500 to-slate-700" },
  ruleHits: { label: "Rule Hits", color: "text-emerald-700", accent: "from-emerald-400 to-emerald-600" },
  cacheHits: { label: "Cache Hits", color: "text-amber-700", accent: "from-amber-400 to-orange-500" },
  llmCalls: { label: "LLM Calls", color: "text-indigo-700", accent: "from-indigo-400 to-violet-600" },
  totalCost: {
    label: "Total Cost",
    color: "text-violet-700",
    accent: "from-violet-400 to-purple-600",
    format: (v) => `$${Number(v).toFixed(4)}`,
  },
};

export default function StatsCard({ stats, loading }) {
  if (loading && !stats) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/70" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {Object.entries(SOURCE_CONFIG).map(([key, config]) => (
        <div
          key={key}
          className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/80 p-4 shadow-lg shadow-slate-200/50 backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${config.accent}`} />
          <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-slate-400">
            {config.label}
          </p>
          <p className={`mt-2 text-2xl font-bold ${config.color}`}>
            {config.format ? config.format(stats[key]) : stats[key] ?? 0}
          </p>
        </div>
      ))}
    </div>
  );
}
