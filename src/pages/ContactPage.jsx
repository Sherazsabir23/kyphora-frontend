import { Mail, MessageCircle, Clock, ArrowRight } from "lucide-react";

const infoCards = [
  {
    icon: Mail,
    title: "Email us",
    description: "support@kyphora.com",
  },

  {
    icon: Clock,
    title: "Response time",
    description: "Usually within 24 hours",
  },
];

const ContactPage = () => {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Get in touch
          </h1>
          <p className="mt-4 text-[#94A3B8]">
            Questions, feedback, or need a hand? We're happy to help.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {infoCards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 text-center sm:p-6"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#3B82F6]/15 text-[#60A5FA]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-white">{title}</p>
              <p className="mt-1 text-xs text-[#94A3B8] sm:text-sm">{description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-3xl border border-white/[0.08] bg-white/5 p-6 sm:p-8">
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-3 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60 focus:bg-white/[0.07]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-3 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60 focus:bg-white/[0.07]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
                Subject
              </label>
              <input
                type="text"
                placeholder="What's this about?"
                className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-3 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60 focus:bg-white/[0.07]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell us what's going on..."
                className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/5 px-4 py-3 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60 focus:bg-white/[0.07]"
              />
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_30px_-8px_rgba(59,130,246,0.7)] transition-all hover:bg-[#60A5FA] sm:w-auto sm:px-8"
            >
              Send Message
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
