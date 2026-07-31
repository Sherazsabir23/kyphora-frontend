import { useState } from "react";
import { RefreshCw, Copy, Check, Wand2 } from "lucide-react";

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const generatePassword = (length, options) => {
  const activeSets = Object.keys(options).filter((key) => options[key]);
  if (activeSets.length === 0) return "";

  const pool = activeSets.map((key) => CHARSETS[key]).join("");
  let password = "";
  for (let i = 0; i < length; i++) {
    password += pool[Math.floor(Math.random() * pool.length)];
  }
  return password;
};

const getStrength = (length, options) => {
  const activeCount = Object.values(options).filter(Boolean).length;
  const score = length * activeCount;
  if (score < 40) return { label: "Weak", color: "bg-[#EF4444]", width: "33%", text: "text-[#EF4444]" };
  if (score < 80) return { label: "Medium", color: "bg-[#F59E0B]", width: "66%", text: "text-[#F59E0B]" };
  return { label: "Strong", color: "bg-[#22C55E]", width: "100%", text: "text-[#22C55E]" };
};

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  // Only set once the person actually clicks Generate — not on every
  // length/toggle change. Bundled together so the strength shown always
  // matches the password that's actually on screen, not the current
  // (possibly since-changed) slider/toggle state.
  const [result, setResult] = useState(null); // { password, strength } | null
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const password = generatePassword(length, options);
    if (!password) return;
    setResult({ password, strength: getStrength(length, options) });
    setCopied(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard?.writeText(result.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const toggleOption = (key) => {
    const activeCount = Object.values(options).filter(Boolean).length;
    if (options[key] && activeCount === 1) return; // keep at least one active
    setOptions((o) => ({ ...o, [key]: !o[key] }));
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Password Generator</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Set your options, then generate a strong, unique password.
        </p>
      </div>

      {/* Preview */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#0F172A] px-4 py-4">
          <p
            className={`min-w-0 flex-1 truncate font-mono text-base sm:text-lg ${
              result ? "text-white" : "text-[#94A3B8]"
            }`}
          >
            {result ? result.password : "Click Generate to create a password"}
          </p>
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              onClick={handleCopy}
              disabled={!result}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#94A3B8]"
              aria-label="Copy password"
            >
              {copied ? <Check className="h-4 w-4 text-[#22C55E]" /> : <Copy className="h-4 w-4" />}
            </button>
            <button
              onClick={handleGenerate}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Regenerate password"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Strength indicator — only shown once a password has actually been generated */}
        {result && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#94A3B8]">Strength</span>
              <span className={`font-medium ${result.strength.text}`}>{result.strength.label}</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={`h-full rounded-full transition-all duration-300 ${result.strength.color}`}
                style={{ width: result.strength.width }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white">Password Length</label>
          <span className="text-sm font-semibold text-[#60A5FA]">{length}</span>
        </div>
        <input
          type="range"
          min={8}
          max={32}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="mt-3 w-full accent-[#3B82F6]"
        />
        <div className="mt-1 flex justify-between text-[10px] text-[#94A3B8]">
          <span>8</span>
          <span>32</span>
        </div>

        <div className="mt-6 space-y-3">
          {[
            { key: "uppercase", label: "Uppercase Letters", sample: "ABC" },
            { key: "lowercase", label: "Lowercase Letters", sample: "abc" },
            { key: "numbers", label: "Numbers", sample: "123" },
            { key: "symbols", label: "Symbols", sample: "!@#" },
          ].map(({ key, label, sample }) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
            >
              <div>
                <p className="text-sm text-white">{label}</p>
                <p className="font-mono text-xs text-[#94A3B8]">{sample}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleOption(key)}
                role="switch"
                aria-checked={options[key]}
                aria-label={`Toggle ${label}`}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
                  options[key] ? "bg-[#3B82F6]" : "bg-white/15"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                    options[key] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_30px_-8px_rgba(59,130,246,0.7)] transition-colors hover:bg-[#60A5FA]"
      >
        <Wand2 className="h-4 w-4" />
        Generate Password
      </button>
    </div>
  );
};

export default PasswordGenerator;