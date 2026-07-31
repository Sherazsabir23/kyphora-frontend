import { ShieldCheck, Lock, Users, Globe2, Sparkles } from "lucide-react";

const stats = [
  { value: "256-bit", label: "AES Encryption" },
  { value: "99.9%", label: "Uptime" },
  { value: "150K+", label: "Vaults Protected" },
  { value: "24/7", label: "Monitoring" },
];

const values = [
  {
    icon: Lock,
    title: "Privacy first",
    description: "We build on a zero-knowledge model — we can't read your data, and neither can anyone else.",
  },
  {
    icon: ShieldCheck,
    title: "Security by default",
    description: "Every feature ships encrypted, hashed, and rate-limited from day one, not bolted on later.",
  },
  {
    icon: Sparkles,
    title: "Simplicity matters",
    description: "Strong security should feel effortless. We design for clarity over complexity.",
  },
  {
    icon: Users,
    title: "Built with feedback",
    description: "Kyphora evolves from real usage — every release responds to what our users actually need.",
  },
];

const AboutPage = () => {
  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 right-[-10%] h-[380px] w-[380px] rounded-full bg-[#3B82F6]/15 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/5 px-4 py-1.5 text-xs font-medium text-[#94A3B8]">
            <Globe2 className="h-3.5 w-3.5 text-[#60A5FA]" />
            About Kyphora
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Security that stays out of your way.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#94A3B8] md:text-lg">
            Kyphora started with a simple frustration: password managers were
            either too complicated or too weak. We built the vault we wanted
            to use ourselves — encrypted, fast, and genuinely easy to trust.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 text-center sm:p-6"
              >
                <p className="text-xl font-semibold text-white sm:text-2xl">{stat.value}</p>
                <p className="mt-1.5 text-xs text-[#94A3B8] sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              What we believe
            </h2>
            <p className="mt-4 text-[#94A3B8]">
              The principles behind every decision we make at Kyphora.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/[0.08] bg-white/5 p-6 transition-colors hover:border-[#3B82F6]/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3B82F6]/15 text-[#60A5FA]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
