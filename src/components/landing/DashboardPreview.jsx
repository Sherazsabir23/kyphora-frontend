import { LayoutDashboard, ShieldCheck, Bell } from "lucide-react";

const callouts = [
  {
    icon: LayoutDashboard,
    title: "One dashboard",
    description: "Every credential, note, and device in a single organized view.",
    position: "xl:-left-14 xl:top-8",
  },
  {
    icon: ShieldCheck,
    title: "Live security score",
    description: "Spot reused or weak passwords the moment they're saved.",
    position: "xl:-right-14 xl:top-1/3",
  },
  {
    icon: Bell,
    title: "Instant alerts",
    description: "Get notified the second an unrecognized device signs in.",
    position: "xl:-left-16 xl:bottom-8",
  },
];

const DashboardPreview = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Everything you need, in one dashboard.
          </h2>
          <p className="mt-4 text-[#94A3B8]">
            Built to feel calm even when it's holding your most sensitive data.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute -inset-8 -z-10 rounded-[40px] bg-[#3B82F6]/10 blur-[100px]" />

          {/* Floating callouts — only from xl up, where there's real side clearance */}
          {callouts.map(({ icon: Icon, title, description, position }) => (
            <div
              key={title}
              className={`absolute z-10 hidden w-56 rounded-xl border border-white/[0.08] bg-[#0F172A]/90 p-4 shadow-xl backdrop-blur-xl xl:block ${position}`}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-[#60A5FA]" />
                <p className="text-sm font-semibold text-white">{title}</p>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{description}</p>
            </div>
          ))}

          <div className="rounded-[24px] border border-white/[0.08] bg-[#0F172A] p-4 shadow-2xl sm:p-5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <p className="text-sm font-semibold text-white">Vault Overview</p>
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#94A3B8]/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]/70" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { label: "Total Items", value: "312" },
                { label: "Weak Passwords", value: "2" },
                { label: "Devices", value: "4" },
                { label: "Security Score", value: "96%" },
              ].map((stat) => (
                <div key={stat.label} className="min-w-0 rounded-xl border border-white/[0.08] bg-white/5 p-3 sm:p-4">
                  <p className="truncate text-lg font-semibold text-white sm:text-xl">{stat.value}</p>
                  <p className="mt-1 truncate text-[10px] text-[#94A3B8] sm:text-[11px]">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-white">Vault activity</p>
                <p className="text-[10px] text-[#94A3B8]">Last 7 days</p>
              </div>
              <div className="mt-4 flex h-24 items-end justify-between gap-2 sm:h-28">
                {[
                  { day: "M", value: 40 },
                  { day: "T", value: 65 },
                  { day: "W", value: 50 },
                  { day: "T", value: 85 },
                  { day: "F", value: 60 },
                  { day: "S", value: 30 },
                  { day: "S", value: 45 },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-full w-full items-end">
                      <div
                        className={`w-full rounded-t-md ${
                          i === 3
                            ? "bg-gradient-to-t from-[#3B82F6] to-[#60A5FA]"
                            : "bg-[#3B82F6]/25"
                        }`}
                        style={{ height: `${bar.value}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-[#94A3B8]">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Same callouts, shown as a plain stacked/grid row below the card on any screen under xl */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 xl:hidden">
            {callouts.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-white/[0.08] bg-white/5 p-4"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#60A5FA]" />
                  <p className="text-sm font-semibold text-white">{title}</p>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
