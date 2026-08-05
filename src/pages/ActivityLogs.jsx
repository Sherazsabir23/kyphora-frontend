import { useEffect, useMemo, useState } from "react";
import { LogIn, KeyRound, RefreshCw, Trash2, ShieldCheck, MapPin, Monitor } from "lucide-react";
import { getActivityLogs } from "../services/activity.service";

const filters = ["All Activity", "Login", "Vault Changes", "Security Events"];

const getIcon = (type, title) => {
  if (type === "Login") return LogIn;
  if (type === "Security Events") return ShieldCheck;
  if (type === "Vault Changes") {
    if (title.startsWith("Added")) return KeyRound;
    if (title.startsWith("Updated")) return RefreshCw;
    if (title.startsWith("Deleted")) return Trash2;
    return KeyRound;
  }
  return KeyRound;
};

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
  if (diffDay === 1) return `Yesterday, ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  if (diffDay < 7) return `${diffDay} days ago`;

  return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
};

const ActivityLogs = () => {
  const [activeFilter, setActiveFilter] = useState("All Activity");
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const data = await getActivityLogs(activeFilter);
        setActivity(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load activity logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [activeFilter]);

  const filtered = useMemo(() => activity, [activity]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Activity Logs</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          A record of logins, vault changes, and security events on your account.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === filter
                ? "border-[#3B82F6]/40 bg-[#3B82F6]/15 text-white"
                : "border-white/[0.08] bg-white/5 text-[#94A3B8] hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 sm:p-6">
        {loading ? (
          <p className="py-6 text-center text-sm text-[#94A3B8]">Loading activity...</p>
        ) : error ? (
          <p className="py-6 text-center text-sm text-[#EF4444]">{error}</p>
        ) : (
          <div className="relative">
            <div className="absolute bottom-2 left-4 top-2 w-px bg-white/[0.08]" />
            <div className="space-y-5">
              {filtered.map(({ _id, type, title, device, location, createdAt }) => {
                const Icon = getIcon(type, title);
                return (
                  <div key={_id} className="relative flex gap-4">
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-[#0F172A] text-[#60A5FA]">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1 pb-0.5">
                      <p className="text-sm font-medium text-white">{title}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#94A3B8]">
                        <span className="flex items-center gap-1.5">
                          <Monitor className="h-3 w-3" />
                          {device}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" />
                          {location}
                        </span>
                        <span>{formatRelativeTime(createdAt)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <p className="py-6 text-center text-sm text-[#94A3B8]">
                  No activity in this category yet.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;
