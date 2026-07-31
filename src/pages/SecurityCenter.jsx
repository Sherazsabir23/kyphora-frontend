import { ShieldCheck, AlertTriangle, ShieldAlert, Clock3, ArrowRight } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";

const health = [
  { label: "Strong Passwords", count: 186, total: 245, color: "bg-[#22C55E]" },
  { label: "Weak Passwords", count: 5, total: 245, color: "bg-[#EF4444]" },
  { label: "Reused Passwords", count: 12, total: 245, color: "bg-[#F59E0B]" },
  { label: "Old Passwords", count: 42, total: 245, color: "bg-[#60A5FA]" },
];

const recommendations = [
  {
    icon: AlertTriangle,
    tone: "danger",
    title: "Fix weak password",
    description: "5 passwords are too short or predictable. Update them to strengthen your vault.",
    action: "Fix Now",
  },
  {
    icon: ShieldCheck,
    tone: "blue",
    title: "Enable 2FA",
    description: "Add two-factor authentication to your account for an extra layer of protection.",
    action: "Enable 2FA",
  },
  {
    icon: Clock3,
    tone: "warning",
    title: "Review old passwords",
    description: "42 passwords haven't been updated in over a year. Consider rotating them.",
    action: "Review",
  },
];

const toneStyles = {
  danger: { bg: "bg-[#EF4444]/10", text: "text-[#EF4444]", border: "border-[#EF4444]/20" },
  blue: { bg: "bg-[#3B82F6]/10", text: "text-[#60A5FA]", border: "border-[#3B82F6]/20" },
  warning: { bg: "bg-[#F59E0B]/10", text: "text-[#F59E0B]", border: "border-[#F59E0B]/20" },
};

const SecurityCenter = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Security Center</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          A full view of your vault's health and recommended actions.
        </p>
      </div>

      {/* Security score */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#22C55E]/20 bg-gradient-to-br from-[#22C55E]/10 to-transparent p-5 sm:col-span-1 sm:p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22C55E]/15 text-[#22C55E]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="mt-4 text-3xl font-semibold text-white">94%</p>
          <p className="mt-1 text-sm font-medium text-white/90">Security Score</p>
          <p className="mt-1 text-xs text-[#94A3B8]">Your vault is well protected overall</p>
        </div>

        <StatCard
          icon={ShieldAlert}
          value="5"
          label="Weak Passwords"
          description="Need attention soon"
          tone="danger"
        />
        <StatCard
          icon={Clock3}
          value="42"
          label="Old Passwords"
          description="Unchanged for 12+ months"
          tone="blue"
        />
      </div>

      {/* Password health */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 sm:p-6">
        <h2 className="text-base font-semibold text-white">Password Health</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {health.map(({ label, count, total, color }) => (
            <div key={label}>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94A3B8]">{label}</span>
                <span className="font-medium text-white">{count}</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-full rounded-full ${color}`}
                  style={{ width: `${Math.min((count / total) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-white">Recommendations</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {recommendations.map(({ icon: Icon, tone, title, description, action }) => {
            const s = toneStyles[tone];
            return (
              <div
                key={title}
                className={`flex flex-col rounded-2xl border ${s.border} bg-white/5 p-5`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg} ${s.text}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-[#94A3B8]">
                  {description}
                </p>
                <button
                  className={`mt-4 flex items-center gap-1.5 text-xs font-semibold ${s.text} hover:text-white`}
                >
                  {action}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;
