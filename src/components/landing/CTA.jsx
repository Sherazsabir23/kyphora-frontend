import { ArrowRight } from "lucide-react";
import {Link} from "react-router-dom"
const CTA = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3B82F6]/25 blur-[140px]" />

      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Ready to protect
          <br /> your digital life?
        </h2>
        <p className="mt-5 text-[#94A3B8]">
          Set up your vault in minutes. No credit card required.
        </p>

       <Link to="/signup">  <button className="group cursor-pointer mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_50px_-16px_rgba(59,130,246,0.9)] transition-transform hover:scale-[1.03]">
         Create Free Account
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button></Link>
      </div>
    </section>
  );
};

export default CTA;
