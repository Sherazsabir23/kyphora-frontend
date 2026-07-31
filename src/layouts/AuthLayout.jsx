import { Outlet } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center gap-10 px-6 py-12 sm:py-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-10 lg:px-8">
        {/* Left Side — visible on every screen size now */}
        <div className="flex w-full max-w-md flex-col items-center text-center lg:max-w-none lg:items-start lg:text-left">
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#60A5FA] sm:mb-4 sm:text-sm">
            <ShieldCheck className="h-4 w-4" />
            Enterprise Security
          </span>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Protect Your
            <span className="block text-[#60A5FA]">Digital Secrets.</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm text-[#94A3B8] sm:mt-6 sm:max-w-lg sm:text-base lg:text-lg">
            Store passwords, API keys, secure notes and sensitive information
            with modern encryption and enterprise-grade security.
          </p>
        </div>

        {/* Right Side — form card */}
        <div className="flex w-full items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
