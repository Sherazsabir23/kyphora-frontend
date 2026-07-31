import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft, Mail } from "lucide-react";

const Pricing = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3B82F6]/20 blur-[140px]" />

      <div className="mx-auto max-w-xl px-6 text-center lg:px-8">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/5 px-4 py-1.5 text-xs font-medium text-[#94A3B8]">
          <Sparkles className="h-3.5 w-3.5 text-[#60A5FA]" />
          Pricing — Coming Soon
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Simple pricing is on its way.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[#94A3B8] md:text-lg">
          We're putting together plans that stay fair as your vault grows.
          Leave your email and we'll let you know the moment pricing goes live.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-2xl border border-[#22C55E]/30 bg-[#22C55E]/10 px-6 py-4 text-sm text-white">
            You're on the list — we'll email you as soon as pricing launches.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/[0.08] bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60 focus:bg-white/[0.07]"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-[#3B82F6] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_30px_-8px_rgba(59,130,246,0.7)] transition-colors hover:bg-[#60A5FA]"
            >
              Notify Me
            </button>
          </form>
        )}

        <Link
          to="/"
          className="mt-10 flex items-center justify-center gap-1.5 text-sm font-medium text-[#94A3B8] hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>
      </div>
    </section>
  );
};

export default Pricing;
