import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, AlertTriangle, ShieldAlert, Clock3, ArrowRight, CheckCircle2 } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import { getSecurityOverview } from "../services/security.service";

const toneStyles = {
  danger: { bg: "bg-[#EF4444]/10", text: "text-[#EF4444]", border: "border-[#EF4444]/20" },
  blue: { bg: "bg-[#3B82F6]/10", text: "text-[#60A5FA]", border: "border-[#3B82F6]/20" },
  warning: { bg: "bg-[#F59E0B]/10", text: "text-[#F59E0B]", border: "border-[#F59E0B]/20" },
  success: { bg: "bg-[#22C55E]/10", text: "text-[#22C55E]", border: "border-[#22C55E]/20" },
};

const SecurityCenter = () => {
  const navigate = useNavigate();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const data = await getSecurityOverview();
        setOverview(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load security overview.");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) {
    return <p className="text-sm text-[#94A3B8]">Loading security overview...</p>;
  }

  if (error || !overview) {
    return <p className="text-sm text-[#EF4444]">{error || "Something went wrong."}</p>;
  }

  const { securityScore, passwordHealth, recommendations } = overview;
  const { strong, weak, reused, old, total } = passwordHealth;

  const health = [
    { label: "Strong Passwords", count: strong, total, color: "bg-[#22C55E]" },
    { label: "Weak Passwords", count: weak, total, color: "bg-[#EF4444]" },
    { label: "Reused Passwords", count: reused, total, color: "bg-[#F59E0B]" },
    { label: "Old Passwords", count: old, total, color: "bg-[#60A5FA]" },
  ];

  // Always show both cards. When the underlying condition is already
  // good, render a resolved/tick state instead of hiding the card.
  const recommendationCards = [
    recommendations.weakPasswordsCount > 0
      ? {
          icon: AlertTriangle,
          tone: "danger",
          title: "Fix weak password",
          description: `${recommendations.weakPasswordsCount} password${
            recommendations.weakPasswordsCount === 1 ? " is" : "s are"
          } too short or predictable. Update them to strengthen your vault.`,
          action: "Fix Now",
          onClick: () => navigate("/dashboard/vault/passwords"),
          resolved: false,
        }
      : {
          icon: CheckCircle2,
          tone: "success",
          title: "No weak passwords",
          description: "All your passwords meet strength requirements. Nice work.",
          resolved: true,
        },
    recommendations.oldPasswordsCount > 0
      ? {
          icon: Clock3,
          tone: "warning",
          title: "Review old passwords",
          description: `${recommendations.oldPasswordsCount} password${
            recommendations.oldPasswordsCount === 1 ? " hasn't" : "s haven't"
          } been updated in over a year. Consider rotating them.`,
          action: "Review",
          onClick: () => navigate("/dashboard/vault/passwords"),
          resolved: false,
        }
      : {
          icon: CheckCircle2,
          tone: "success",
          title: "Passwords up to date",
          description: "No passwords are overdue for a rotation.",
          resolved: true,
        },
  ];

  const scoreDescription =
    securityScore >= 80
      ? "Your vault is well protected overall"
      : securityScore >= 50
      ? "Your vault could use some improvements"
      : "Your vault needs attention";

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
          <p className="mt-4 text-3xl font-semibold text-white">{securityScore}%</p>
          <p className="mt-1 text-sm font-medium text-white/90">Security Score</p>
          <p className="mt-1 text-xs text-[#94A3B8]">{scoreDescription}</p>
        </div>

        <StatCard
          icon={ShieldAlert}
          value={String(weak)}
          label="Weak Passwords"
          description="Need attention soon"
          tone="danger"
        />
        <StatCard
          icon={Clock3}
          value={String(old)}
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
                  style={{ width: `${total > 0 ? Math.min((count / total) * 100, 100) : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-white">Recommendations</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {recommendationCards.map(({ icon: Icon, tone, title, description, action, onClick, resolved }) => {
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
                {resolved ? (
                  <span className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#22C55E]">
                    Resolved
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <button
                    onClick={onClick}
                    className={`mt-4 flex items-center gap-1.5 text-xs font-semibold ${s.text} hover:text-white`}
                  >
                    {action}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;