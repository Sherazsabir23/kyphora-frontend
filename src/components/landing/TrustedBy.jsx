const logos = ["GitHub", "Google", "Microsoft", "Amazon", "Netflix", "Spotify"];

const TrustedBy = () => {
  return (
    <section className="border-y border-white/[0.08] bg-white/[0.02] py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-[#94A3B8]">
          Built for teams who already trust
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-sm font-semibold text-[#94A3B8]/70 grayscale transition-colors hover:text-white"
            >
              {logo}
            </span>
          ))}
        </div>
        <p className="mt-4 text-center text-[11px] text-[#94A3B8]/50">
          Logos shown for illustrative purposes only — not official partners.
        </p>
      </div>
    </section>
  );
};

export default TrustedBy;
