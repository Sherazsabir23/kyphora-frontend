import { useState } from "react";
import { UserCircle2, Eye, EyeOff, Copy, FileText, Plus, IdCard } from "lucide-react";

const personalFields = [
  { label: "Full Name", value: "Jordan Alexander Lee", secure: false },
  { label: "Date of Birth", value: "March 14, 1990", secure: false },
  { label: "Phone Number", value: "+1 (555) 019-2837", secure: false },
  { label: "Home Address", value: "482 Cedar Grove Lane, Austin, TX", secure: false },
];

const secureFields = [
  { label: "Social Security Number", value: "•••-••-1029" },
  { label: "Passport Number", value: "X48213908" },
  { label: "Driver's License", value: "TX-88213741" },
];

const idDocuments = [
  { name: "Passport Scan.pdf", type: "PDF", size: "1.2 MB" },
  { name: "Driver's License.jpg", type: "Image", size: "640 KB" },
];

const IdentityVault = () => {
  const [revealed, setRevealed] = useState({});

  const toggleReveal = (label) => setRevealed((v) => ({ ...v, [label]: !v[label] }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Identity</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Your personal information, secure fields, and identity documents.
        </p>
      </div>

      {/* Profile summary */}
      <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/5 p-5 sm:p-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-xl font-semibold text-white">
          JL
        </div>
        <div>
          <p className="text-base font-semibold text-white">Jordan Alexander Lee</p>
          <p className="text-sm text-[#94A3B8]">Primary identity profile</p>
        </div>
      </div>

      {/* Personal information */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <UserCircle2 className="h-4.5 w-4.5 text-[#60A5FA]" />
          <h2 className="text-sm font-semibold text-white">Personal Information</h2>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {personalFields.map((field) => (
            <div key={field.label}>
              <p className="text-xs text-[#94A3B8]">{field.label}</p>
              <p className="mt-1 text-sm text-white">{field.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Secure fields */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <IdCard className="h-4.5 w-4.5 text-[#60A5FA]" />
          <h2 className="text-sm font-semibold text-white">Government IDs</h2>
        </div>
        <div className="mt-5 space-y-3">
          {secureFields.map((field) => (
            <div
              key={field.label}
              className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
            >
              <div>
                <p className="text-xs text-[#94A3B8]">{field.label}</p>
                <p className="mt-1 font-mono text-sm text-white">
                  {revealed[field.label] ? field.value.replace("•••-••-", "482-91-") : field.value}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleReveal(field.label)}
                  className="rounded-lg p-2 text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Toggle visibility"
                >
                  {revealed[field.label] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button
                  className="rounded-lg p-2 text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Copy"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4.5 w-4.5 text-[#60A5FA]" />
            <h2 className="text-sm font-semibold text-white">Identity Documents</h2>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-medium text-[#60A5FA] hover:text-white">
            <Plus className="h-3.5 w-3.5" />
            Upload
          </button>
        </div>
        <div className="mt-5 space-y-2">
          {idDocuments.map((doc) => (
            <div
              key={doc.name}
              className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#60A5FA]">
                  <FileText className="h-4 w-4" />
                </span>
                <p className="text-sm text-white">{doc.name}</p>
              </div>
              <p className="text-xs text-[#94A3B8]">{doc.size}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdentityVault;
