import { useMemo, useState } from "react";
import { LogIn, KeyRound, RefreshCw, ShieldCheck, MapPin, Monitor } from "lucide-react";

const filters = ["All Activity", "Login", "Vault Changes", "Security Events"];

const activity = [
  {
    id: 1,
    type: "Login",
    icon: LogIn,
    title: "Login from Chrome, Windows",
    device: "Chrome · Windows 11",
    location: "Austin, TX, US",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "Vault Changes",
    icon: KeyRound,
    title: "Added new password — GitHub",
    device: "Kyphora App · macOS",
    location: "Austin, TX, US",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "Vault Changes",
    icon: RefreshCw,
    title: "Updated vault item — AWS Console",
    device: "Kyphora App · iOS",
    location: "Austin, TX, US",
    time: "Yesterday, 4:12 PM",
  },
  {
    id: 4,
    type: "Security Events",
    icon: ShieldCheck,
    title: "Two-factor authentication enabled",
    device: "Kyphora App · macOS",
    location: "Austin, TX, US",
    time: "2 days ago",
  },
  {
    id: 5,
    type: "Login",
    icon: LogIn,
    title: "Login from Safari, iPhone",
    device: "Safari · iOS 18",
    location: "Dallas, TX, US",
    time: "3 days ago",
  },
  {
    id: 6,
    type: "Security Events",
    icon: ShieldCheck,
    title: "Master password changed",
    device: "Kyphora App · Windows 11",
    location: "Austin, TX, US",
    time: "5 days ago",
  },
];

const ActivityLogs = () => {
  const [activeFilter, setActiveFilter] = useState("All Activity");

  const filtered = useMemo(() => {
    if (activeFilter === "All Activity") return activity;
    return activity.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

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
        <div className="relative">
          <div className="absolute bottom-2 left-4 top-2 w-px bg-white/[0.08]" />
          <div className="space-y-5">
            {filtered.map(({ id, icon: Icon, title, device, location, time }) => (
              <div key={id} className="relative flex gap-4">
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
                    <span>{time}</span>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="py-6 text-center text-sm text-[#94A3B8]">
                No activity in this category yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
