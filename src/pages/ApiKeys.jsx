import { useState } from "react";
import { Code2, Eye, EyeOff, Copy, Pencil, Trash2, Plus } from "lucide-react";

const initialKeys = [
  { id: 1, service: "Stripe (Live)", key: "demo_stripe_live_key", created: "2026-06-02" },
  { id: 2, service: "SendGrid", key: "demo_sendgrid_api_key", created: "2026-05-18" },
  { id: 3, service: "AWS Access Key", key: "demo_aws_access_key", created: "2026-04-30" },
  { id: 4, service: "OpenAI", key: "demo_openai_api_key", created: "2026-04-12" },
];
const maskKey = (key) => `${key.slice(0, 6)}${"•".repeat(Math.max(key.length - 10, 6))}${key.slice(-4)}`;

const ApiKeys = () => {
  const [visible, setVisible] = useState({});

  const toggleVisible = (id) => setVisible((v) => ({ ...v, [id]: !v[id] }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">API Keys</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            {initialKeys.length} keys stored — keep these out of client-side code.
          </p>
        </div>
        <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_24px_-8px_rgba(59,130,246,0.7)] transition-colors hover:bg-[#60A5FA]">
          <Plus className="h-4 w-4" />
          Add API Key
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wide text-[#94A3B8]">
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Key</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialKeys.map((item) => (
                <tr key={item.id} className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03]">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#60A5FA]">
                        <Code2 className="h-4 w-4" />
                      </span>
                      <span className="font-medium text-white">{item.service}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-white sm:text-sm">
                        {visible[item.id] ? item.key : maskKey(item.key)}
                      </span>
                      <button
                        onClick={() => toggleVisible(item.id)}
                        className="text-[#94A3B8] transition-colors hover:text-white"
                        aria-label="Toggle key visibility"
                      >
                        {visible[item.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        onClick={() => navigator.clipboard?.writeText(item.key)}
                        className="text-[#94A3B8] transition-colors hover:text-white"
                        aria-label="Copy key"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#94A3B8]">{item.created}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button className="rounded-lg p-2 text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white" aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-[#94A3B8] transition-colors hover:bg-[#EF4444]/10 hover:text-[#EF4444]" aria-label="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;
