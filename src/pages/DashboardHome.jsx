import { useState } from "react";
import {
  KeyRound,
  ShieldCheck,
  AlertTriangle,
  Monitor,
  Plus,
  StickyNote,
  Wand2,
  Upload,
} from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import QuickActionCard from "../components/dashboard/QuickActionCard";
import VaultTable from "../components/dashboard/VaultTable";
import SecurityCard from "../components/dashboard/SecurityCard";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import UpgradeBanner from "../components/dashboard/UpgradeBanner";
import EmptyState from "../components/dashboard/EmptyState";

const stats = [
  {
    icon: KeyRound,
    value: "245",
    label: "Total Vault Items",
    description: "Saved across all categories",
    tone: "blue",
  },
  {
    icon: ShieldCheck,
    value: "94%",
    label: "Security Score",
    description: "Your vault is well protected",
    tone: "success",
  },
  {
    icon: AlertTriangle,
    value: "5",
    label: "Weak Passwords",
    description: "Need attention soon",
    tone: "danger",
  },
  {
    icon: Monitor,
    value: "3",
    label: "Active Devices",
    description: "Currently connected",
    tone: "blue",
  },
];

const quickActions = [
  { icon: Plus, title: "Add Password", description: "Save a new login to your vault." },
  { icon: StickyNote, title: "Create Secure Note", description: "Store sensitive text safely." },
  { icon: Wand2, title: "Generate Password", description: "Create a strong, unique password." },
  { icon: Upload, title: "Import Data", description: "Bring in items from another manager." },
];

const DashboardHome = () => {
  const [showEmptyDemo, setShowEmptyDemo] = useState(false);

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <QuickActionCard key={action.title} {...action} />
          ))}
        </div>
      </div>

      {/* Vault preview */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Vault Preview</h2>
          <button
            onClick={() => setShowEmptyDemo((v) => !v)}
            className="text-xs font-medium text-[#60A5FA] hover:text-white"
          >
            {showEmptyDemo ? "Show sample items" : "Preview empty state"}
          </button>
        </div>
        {showEmptyDemo ? (
          <EmptyState onAction={() => setShowEmptyDemo(false)} />
        ) : (
          <VaultTable />
        )}
      </div>

      {/* Security + Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SecurityCard />
        <ActivityTimeline />
      </div>

      {/* Upgrade */}
      <UpgradeBanner />
    </div>
  );
};

export default DashboardHome;
