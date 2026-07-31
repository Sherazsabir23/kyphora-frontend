import {
  Lock,
  Fingerprint,
  Cookie,
  ShieldHalf,
  Gauge,
  Hash,
  CheckSquare,
  KeySquare,
} from "lucide-react";

const items = [
  { icon: Lock, title: "AES Encryption", description: "256-bit AES encrypts every item before it leaves your device." },
  { icon: Fingerprint, title: "JWT Authentication", description: "Stateless, signed tokens verify every request you make." },
  { icon: Cookie, title: "HTTP Only Cookies", description: "Session tokens are inaccessible to client-side scripts." },
  { icon: ShieldHalf, title: "Helmet Security", description: "Hardened HTTP headers block common browser-based attacks." },
  { icon: Gauge, title: "Rate Limiting", description: "Automated abuse and brute-force attempts are throttled instantly." },
  { icon: Hash, title: "Password Hashing", description: "Master passwords are hashed with salted, one-way algorithms." },
  { icon: CheckSquare, title: "Input Validation", description: "Every payload is sanitized and validated before it's processed." },
  { icon: KeySquare, title: "Secure Sessions", description: "Sessions rotate and expire automatically to limit exposure." },
];

const SecurityFeatures = () => {
  return (
    <section id="security" className="relative overflow-hidden py-24 md:py-32">
      {/* Animated grid background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15] [animation:grid-pan_18s_linear_infinite]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#050816]/60 to-[#050816]" />
      <style>{`
        @keyframes grid-pan {
          from { background-position: 0 0, 0 0; }
          to { background-position: 48px 48px, 48px 48px; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="grid-pan"] { animation: none !important; }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Security, taken seriously
          </h2>
          <p className="mt-4 text-[#94A3B8]">
            The same protections behind Kyphora's engine, in plain terms.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/[0.08] bg-[#0F172A]/70 p-5 backdrop-blur-sm transition-colors hover:border-[#3B82F6]/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#60A5FA]">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures;
