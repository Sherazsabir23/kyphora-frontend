import { UserPlus, KeyRound, Globe2 } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up and set your master password — the only one you'll ever need to remember.",
  },
  {
    icon: KeyRound,
    title: "Save Passwords",
    description: "Import existing credentials or add new ones as you browse.",
  },
  {
    icon: Globe2,
    title: "Access Anywhere",
    description: "Unlock your vault on any device, encrypted end-to-end the whole way.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            How Kyphora works
          </h2>
          <p className="mt-4 text-[#94A3B8]">Three steps between you and a fully protected vault.</p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-white/[0.08] md:left-1/2 md:block" />

          <div className="space-y-10 md:space-y-16">
            {steps.map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 md:text-right">
                  <div className={i % 2 === 1 ? "md:text-left" : ""}>
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="mt-1.5 text-sm text-[#94A3B8]">{description}</p>
                  </div>
                </div>

                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#3B82F6]/40 bg-[#0F172A] text-[#60A5FA] shadow-[0_0_20px_-2px_rgba(59,130,246,0.6)] md:mx-0">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
