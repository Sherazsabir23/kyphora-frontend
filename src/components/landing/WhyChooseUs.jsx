import { CheckCircle2, XCircle } from "lucide-react";

const rows = [
  "Encrypted end-to-end",
  "Auto organized vault",
  "Full login history",
  "Cross device access",
  "Breach protection",
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Why choose Kyphora
          </h2>
          <p className="mt-4 text-[#94A3B8]">
            Compared to saving passwords in a notes app or your browser.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* SecureVault */}
          <div className="rounded-2xl border border-[#3B82F6]/40 bg-gradient-to-b from-[#3B82F6]/10 to-transparent p-8 shadow-[0_16px_50px_-20px_rgba(59,130,246,0.6)]">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#60A5FA]">
              SecureVault
            </p>
            <ul className="mt-6 space-y-4">
              {rows.map((row) => (
                <li key={row} className="flex items-center gap-3 text-sm text-white">
                  <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-[#22C55E]" />
                  {row}
                </li>
              ))}
            </ul>
          </div>

          {/* Traditional */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#94A3B8]">
              Traditional Password Saving
            </p>
            <ul className="mt-6 space-y-4">
              {rows.map((row) => (
                <li key={row} className="flex items-center gap-3 text-sm text-[#94A3B8]">
                  <XCircle className="h-4.5 w-4.5 shrink-0 text-[#EF4444]/80" />
                  {row}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
