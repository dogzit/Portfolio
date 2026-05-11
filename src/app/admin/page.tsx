"use client";

import { useEffect, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type VisitorLog = {
  id: string;
  ip: string | null;
  userAgent: string | null;
  path: string;
  country: string | null;
  city: string | null;
  region: string | null;
  createdAt: string;
};

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

type Stats = {
  uniqueIps: number;
  uniquePaths: number;
  countryBreakdown: Record<string, number>;
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function parseDevice(ua: string | null) {
  if (!ua) return "—";
  if (/mobile/i.test(ua)) return "Mobile";
  if (/tablet/i.test(ua)) return "Tablet";
  return "Desktop";
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [key, setKey]         = useState("");
  const [authed, setAuthed]   = useState(false);
  const [tab, setTab]         = useState<"analytics" | "messages">("messages");
  const [logs, setLogs]       = useState<VisitorLog[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats]     = useState<Stats | null>(null);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchData(secretKey: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/stats?key=${encodeURIComponent(secretKey)}`);
      if (res.status === 401) { setError("Wrong key."); return; }
      if (!res.ok)            { setError("Server error."); return; }
      const data = await res.json();
      setLogs(data.logs ?? []);
      setMessages(data.messages ?? []);
      setStats(data.stats);
      setAuthed(true);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  async function markRead(id: string) {
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
    await fetch(`/api/admin/stats?key=${encodeURIComponent(key)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  // Auto-refresh every 30 s
  useEffect(() => {
    if (!authed || !key) return;
    const id = setInterval(() => fetchData(key), 30_000);
    return () => clearInterval(id);
  }, [authed, key]);

  // ── Login gate ───────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl p-8 space-y-4">
          <p className="text-xs font-mono text-white/40 text-center tracking-widest uppercase">Admin</p>
          <input
            type="password"
            placeholder="Secret key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchData(key)}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm font-mono placeholder:text-white/20 focus:outline-none focus:border-blue-500/50"
          />
          {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
          <button
            onClick={() => fetchData(key)}
            disabled={loading || !key}
            className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors disabled:opacity-40"
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </div>
      </div>
    );
  }

  const unread = messages.filter((m) => !m.read).length;
  const topCountries = stats
    ? Object.entries(stats.countryBreakdown).sort((a, b) => b[1] - a[1]).slice(0, 5)
    : [];

  // ── Dashboard ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-bold text-white">Dashboard</h1>
        <button
          onClick={() => fetchData(key)}
          className="text-xs text-blue-400 hover:text-blue-300 font-mono transition-colors"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-white/[0.04] border border-white/[0.07] rounded-xl p-1 w-fit">
        {(["messages", "analytics"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
              tab === t
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {t === "messages" ? "Messages" : "Analytics"}
            {t === "messages" && unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-[10px] font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── MESSAGES TAB ───────────────────────────────────────────────────── */}
      {tab === "messages" && (
        <div className="space-y-3">
          {messages.length === 0 && (
            <p className="text-sm text-white/20 font-mono text-center py-16">No messages yet.</p>
          )}
          {messages.map((msg) => (
            <MessageCard key={msg.id} msg={msg} onRead={() => markRead(msg.id)} />
          ))}
        </div>
      )}

      {/* ── ANALYTICS TAB ──────────────────────────────────────────────────── */}
      {tab === "analytics" && (
        <>
          {/* Stat cards */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total visits"  value={logs.length} />
              <StatCard label="Unique IPs"    value={stats.uniqueIps} />
              <StatCard label="Unique pages"  value={stats.uniquePaths} />
              <StatCard label="Top country"   value={topCountries[0]?.[0] ?? "—"} />
            </div>
          )}

          {/* Country breakdown */}
          {topCountries.length > 0 && (
            <div className="bg-[#111] border border-white/[0.07] rounded-2xl p-5 mb-8">
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">Countries</p>
              <div className="flex flex-wrap gap-2">
                {topCountries.map(([c, n]) => (
                  <span key={c} className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-white/60">
                    {c} · {n}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Visitor table */}
          <div className="bg-[#111] border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    {["Time", "IP", "Location", "Path", "Device"].map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left text-xs font-mono text-white/30 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3 font-mono text-xs text-white/40 whitespace-nowrap">{formatDate(log.createdAt)}</td>
                      <td className="px-5 py-3 font-mono text-xs text-white/60">{log.ip ?? "—"}</td>
                      <td className="px-5 py-3 text-xs text-white/50">{[log.city, log.country].filter(Boolean).join(", ") || "—"}</td>
                      <td className="px-5 py-3 font-mono text-xs text-blue-400/70 max-w-[180px] truncate">{log.path}</td>
                      <td className="px-5 py-3 text-xs text-white/30">{parseDevice(log.userAgent)}</td>
                    </tr>
                  ))}
                  {logs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-xs text-white/20 font-mono">No visits yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function MessageCard({ msg, onRead }: { msg: Message; onRead: () => void }) {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen((v) => !v);
    if (!msg.read) onRead();
  }

  return (
    <div
      className={`bg-[#111] border rounded-2xl overflow-hidden transition-colors cursor-pointer ${
        msg.read ? "border-white/[0.06]" : "border-blue-500/30"
      }`}
      onClick={toggle}
    >
      {/* Summary row */}
      <div className="flex items-center gap-4 px-5 py-4">
        {/* Unread dot */}
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${msg.read ? "bg-white/10" : "bg-blue-400"}`} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <p className={`text-sm font-semibold truncate ${msg.read ? "text-white/60" : "text-white"}`}>
              {msg.name}
            </p>
            <p className="text-xs text-white/30 font-mono truncate">{msg.email}</p>
          </div>
          <p className="text-xs text-white/40 mt-0.5 truncate">{msg.message}</p>
        </div>

        <p className="text-xs text-white/25 font-mono flex-shrink-0">{formatDate(msg.createdAt)}</p>
        <span className={`text-white/30 text-xs transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}>▾</span>
      </div>

      {/* Expanded message */}
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-white/[0.05]">
          <div className="flex gap-3 mb-3 text-xs font-mono text-white/30">
            <span>{msg.name}</span>
            <span>·</span>
            <a href={`mailto:${msg.email}`} className="text-blue-400/60 hover:text-blue-400 transition-colors" onClick={(e) => e.stopPropagation()}>
              {msg.email}
            </a>
          </div>
          <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
          <a
            href={`mailto:${msg.email}?subject=Re: Your message&body=${encodeURIComponent("\n\n---\n" + msg.message)}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-xs text-blue-400 font-medium hover:bg-blue-600/30 transition-colors"
          >
            Reply via email ↗
          </a>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-2xl p-5">
      <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
