import { Sparkles, Check } from "lucide-react";

const features = [
  "Unlimited secure storage",
  "Secure sharing",
  "Advanced security reports",
  "Emergency access",
  "Dark web monitoring",
];

const UpgradeBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#3B82F6]/30 bg-gradient-to-br from-[#3B82F6]/15 via-[#0F172A] to-[#0F172A] p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#3B82F6]/25 blur-[80px]" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 text-xs font-medium text-[#60A5FA]">
            <Sparkles className="h-3.5 w-3.5" />
            Kyphora Premium
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white sm:text-2xl">
            Unlock the full vault experience
          </h3>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                <Check className="h-3.5 w-3.5 shrink-0 text-[#22C55E]" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <button className="shrink-0 rounded-xl bg-[#3B82F6] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_30px_-8px_rgba(59,130,246,0.7)] transition-colors hover:bg-[#60A5FA] lg:ml-8">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
};

export default UpgradeBanner;
