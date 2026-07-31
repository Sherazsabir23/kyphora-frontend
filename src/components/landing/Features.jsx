import { KeyRound, StickyNote, Wand2, RefreshCw, MailCheck, History } from "lucide-react";

const features = [
  {
    icon: KeyRound,
    title: "Password Vault",
    description: "Store unlimited credentials behind a single encrypted master key.",
  },
  {
    icon: StickyNote,
    title: "Secure Notes",
    description: "Keep sensitive text, keys, and documents encrypted alongside your logins.",
  },
  {
    icon: Wand2,
    title: "Password Generator",
    description: "Create strong, unique passwords in one click, tuned to each site's rules.",
  },
  {
    icon: RefreshCw,
    title: "Cross Device Sync",
    description: "Your vault updates instantly across desktop, mobile, and browser.",
  },
  {
    icon: MailCheck,
    title: "Email Verification",
    description: "Confirm every new device and login attempt before access is granted.",
  },
  {
    icon: History,
    title: "Login History",
    description: "See every access event with device, location, and timestamp.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Everything a vault should do
          </h2>
          <p className="mt-4 text-[#94A3B8]">
            No clutter, no upsells — just the tools that keep your secrets safe.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3B82F6]/40 hover:shadow-[0_16px_40px_-16px_rgba(59,130,246,0.5)]"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#3B82F6]/0 to-[#3B82F6]/0 transition-colors duration-300 group-hover:from-[#3B82F6]/10 group-hover:to-transparent" />
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
  );
};

export default Features;
