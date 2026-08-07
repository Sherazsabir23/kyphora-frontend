import { useEffect, useState } from "react";
import {
  KeyRound,
  ShieldCheck,
  AlertTriangle,
  Monitor,
  LogIn,
  RefreshCw,
  Trash2,
} from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import SecurityCard from "../components/dashboard/SecurityCard";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import UpgradeBanner from "../components/dashboard/UpgradeBanner";
import { getDashboardOverview } from "../services/dashboard.service";

const getActivityIcon = (type, title) => {
  if (type === "Login") return LogIn;
  if (type === "Security Events") return ShieldCheck;
  if (type === "Vault Changes") {
    if (title.startsWith("Added")) return KeyRound;
    if (title.startsWith("Updated")) return RefreshCw;
    if (title.startsWith("Deleted")) return Trash2;
  }
  return KeyRound;
};

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay} days ago`;
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

const DashboardHome = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboardOverview();
        setOverview(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <p className="text-sm text-[#94A3B8]">Loading dashboard...</p>;
  }

  if (error || !overview) {
    return <p className="text-sm text-[#EF4444]">{error || "Something went wrong."}</p>;
  }

  const { stats: s, twoFactorEnabled, passwordHealth, recentActivity } = overview;

  const stats = [
    {
      icon: KeyRound,
      value: String(s.totalVaultItems),
      label: "Total Vault Items",
      description: "Saved across all categories",
      tone: "blue",
    },
    {
      icon: ShieldCheck,
      value: `${s.securityScore}%`,
      label: "Security Score",
      description:
        s.securityScore >= 80 ? "Your vault is well protected" : "Your vault needs attention",
      tone: s.securityScore >= 80 ? "success" : "danger",
    },
    {
      icon: AlertTriangle,
      value: String(s.weakPasswordsCount),
      label: "Weak Passwords",
      description: "Need attention soon",
      tone: "danger",
    },
    {
      icon: Monitor,
      value: String(s.activeDevicesCount),
      label: "Active Devices",
      description: "Currently connected",
      tone: "blue",
    },
  ];

  const activityItems = recentActivity.map(({ type, title, device, createdAt }) => ({
    icon: getActivityIcon(type, title),
    title,
    device,
    time: formatRelativeTime(createdAt),
  }));

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Security + Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SecurityCard
          passwordHealth={passwordHealth}
          totalItems={s.totalVaultItems}
          twoFactorEnabled={twoFactorEnabled}
        />
        <ActivityTimeline items={activityItems} />
      </div>

      {/* Upgrade */}
      <UpgradeBanner />
    </div>
  );
};

export default DashboardHome;