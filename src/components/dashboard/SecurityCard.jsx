import { AlertTriangle, ShieldCheck } from "lucide-react";

const toneStyles = {
  danger: { bg: "bg-[#EF4444]/10", text: "text-[#EF4444]", border: "border-[#EF4444]/20" },
  blue: { bg: "bg-[#3B82F6]/10", text: "text-[#60A5FA]", border: "border-[#3B82F6]/20" },
};

const SecurityCard = ({ passwordHealth, totalItems, twoFactorEnabled }) => {
  const { strong = 0, weak = 0, reused = 0, old = 0, total = 0 } = passwordHealth || {};

  const health = [
    { label: "Strong Passwords", count: strong, total, color: "bg-[#22C55E]" },
    { label: "Weak Passwords", count: weak, total, color: "bg-[#EF4444]" },
    { label: "Reused Passwords", count: reused, total, color: "bg-[#F59E0B]" },
    { label: "Old Passwords", count: old, total, color: "bg-[#60A5FA]" },
  ];

  const recommendations = [
    reused > 0 && {
      icon: AlertTriangle,
      tone: "danger",
      text: `${reused} password${reused === 1 ? " is" : "s are"} reused on multiple sites.`,
    },
    !twoFactorEnabled && {
      icon: ShieldCheck,
      tone: "blue",
      text: "Enable two-factor authentication for better protection.",
    },
  ].filter(Boolean);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Password Health</h3>
        <span className="text-xs text-[#94A3B8]">{totalItems ?? 0} total items</span>
      </div>

      <div className="mt-5 space-y-4">
        {health.map(({ label, count, total: t, color }) => (
          <div key={label}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#94A3B8]">{label}</span>
              <span className="font-medium text-white">{count}</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={`h-full rounded-full ${color}`}
                style={{ width: `${t > 0 ? Math.min((count / t) * 100, 100) : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {recommendations.length > 0 && (
        <div className="mt-6 space-y-3">
          {recommendations.map(({ icon: Icon, tone, text }) => {
            const s = toneStyles[tone];
            return (
              <div
                key={text}
                className={`flex items-start gap-3 rounded-xl border ${s.border} ${s.bg} p-3.5`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${s.text}`} />
                <p className="text-xs leading-relaxed text-white/90">{text}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SecurityCard;
