const testimonials = [
  {
    name: "Amara Chen",
    position: "Engineering Lead, sample profile",
    review:
      "Switching our team over took an afternoon. The sync between devices has been flawless since day one.",
    initials: "AC",
  },
  {
    name: "David Okafor",
    position: "Freelance Developer, sample profile",
    review:
      "The login history view alone caught an unfamiliar sign-in before I even noticed something was off.",
    initials: "DO",
  },
  {
    name: "Priya Nair",
    position: "IT Administrator, sample profile",
    review:
      "Rolling this out org-wide was painless. Employees actually enjoy using it, which says a lot.",
    initials: "PN",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            What people are saying
          </h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            Sample testimonials for demonstration — not real customer endorsements.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map(({ name, position, review, initials }) => (
            <div
              key={name}
              className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/5 p-6"
            >
              <p className="flex-1 text-sm leading-relaxed text-[#94A3B8]">"{review}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-xs font-semibold text-white">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{name}</p>
                  <p className="text-xs text-[#94A3B8]">{position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
