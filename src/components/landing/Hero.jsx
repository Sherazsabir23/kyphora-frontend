import { ShieldCheck, Lock, ArrowRight, PlayCircle, Fingerprint } from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
const trustBadges = [
  { icon: Lock, label: "AES Encryption" },
  { icon: Fingerprint, label: "JWT Auth" },
  { icon: ShieldCheck, label: "Cross Device" },
];

const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const user = useSelector((state) => state.auth.user);

const handleGetStarted = async () => {
  if(user){
    navigate("/dashboard")
  }else{
    navigate("/login")
  }
}
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-[#3B82F6]/20 blur-[120px]" />
        <div className="absolute top-1/3 left-[-10%] h-[380px] w-[380px] rounded-full bg-[#60A5FA]/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        {/* Left column */}
        <div>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl">
            Secure your passwords,{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent">
              notes and digital secrets
            </span>{" "}
            in one encrypted vault.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#94A3B8] md:text-lg">
            Kyphora keeps every credential end-to-end encrypted, synced
            across your devices, and out of reach from everyone but you.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button onClick={handleGetStarted} className="group inline-flex items-center gap-2 rounded-2xl bg-[#3B82F6] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_30px_-8px_rgba(59,130,246,0.7)] transition-all hover:bg-[#60A5FA] hover:shadow-[0_0_0_1px_rgba(96,165,250,0.6),0_12px_40px_-8px_rgba(96,165,250,0.8)]">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              <PlayCircle className="h-4 w-4" />
              View Demo
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                <Icon className="h-4 w-4 text-[#60A5FA]" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Right column — floating dashboard mockup */}
        <div className="relative w-full max-w-full">
          <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-[#3B82F6]/20 via-transparent to-transparent blur-2xl" />
          <div className="w-full max-w-full overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0F172A]/80 p-2.5 shadow-2xl backdrop-blur-xl sm:rounded-[24px] sm:p-3">
            <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-2 pb-3 sm:px-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#94A3B8]/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]/70" />
            </div>

            <div className="flex flex-col gap-3 p-2 sm:grid sm:grid-cols-4 sm:p-3">
              {/* Sidebar — horizontal pills on mobile, vertical list from sm up */}
              <div className="flex gap-2 overflow-x-auto pb-1 sm:col-span-1 sm:flex-col sm:space-y-2 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
                {["Dashboard", "Vault", "Notes", "History"].map((item, i) => (
                  <div
                    key={item}
                    className={`shrink-0 whitespace-nowrap rounded-lg px-2.5 py-2 text-[11px] font-medium ${
                      i === 0
                        ? "bg-[#3B82F6]/20 text-white"
                        : "text-[#94A3B8]"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Main panel */}
              <div className="min-w-0 space-y-3 sm:col-span-3">
                <div className="grid grid-cols-3 gap-2">
                  {["128", "24", "99.9%"].map((stat, i) => (
                    <div key={i} className="min-w-0 rounded-xl border border-white/[0.08] bg-white/5 p-2 sm:p-3">
                      <p className="truncate text-base font-semibold text-white sm:text-lg">{stat}</p>
                      <p className="truncate text-[9px] text-[#94A3B8] sm:text-[10px]">
                        {["Passwords", "Notes", "Uptime"][i]}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {["GitHub", "Google Workspace", "AWS Console"].map((name) => (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-white/5 px-2.5 py-2.5 sm:px-3"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="h-6 w-6 shrink-0 rounded-md bg-gradient-to-br from-[#3B82F6] to-[#60A5FA]" />
                        <span className="truncate text-xs text-white">{name}</span>
                      </div>
                      <Lock className="h-3.5 w-3.5 shrink-0 text-[#94A3B8]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
