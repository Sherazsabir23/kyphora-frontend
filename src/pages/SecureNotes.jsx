import { useMemo, useState } from "react";
import { Search, Plus, StickyNote, Pencil, Trash2, Eye } from "lucide-react";

const categories = ["All", "Personal", "Work", "Finance", "Recovery"];

const initialNotes = [
  {
    id: 1,
    title: "Server Root Credentials",
    preview: "Root access notes for the staging environment, rotate every 90 days...",
    category: "Work",
    updated: "2026-07-25",
  },
  {
    id: 2,
    title: "Wi-Fi Recovery Codes",
    preview: "Home router admin panel recovery codes and backup access details...",
    category: "Personal",
    updated: "2026-07-20",
  },
  {
    id: 3,
    title: "Bank Security Questions",
    preview: "Answers to Chase Bank security questions for account recovery...",
    category: "Finance",
    updated: "2026-07-18",
  },
  {
    id: 4,
    title: "2FA Backup Codes",
    preview: "One-time backup codes for GitHub two-factor authentication...",
    category: "Recovery",
    updated: "2026-07-12",
  },
  {
    id: 5,
    title: "Passport & Visa Notes",
    preview: "Reference numbers and renewal dates for travel documents...",
    category: "Personal",
    updated: "2026-07-05",
  },
];

const SecureNotes = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return initialNotes.filter((note) => {
      const matchesQuery = note.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || note.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Secure Notes</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            {initialNotes.length} notes stored securely
          </p>
        </div>
        <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_24px_-8px_rgba(59,130,246,0.7)] transition-colors hover:bg-[#60A5FA]">
          <Plus className="h-4 w-4" />
          Create Note
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full rounded-xl border border-white/[0.08] bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                category === cat
                  ? "border-[#3B82F6]/40 bg-[#3B82F6]/15 text-white"
                  : "border-white/[0.08] bg-white/5 text-[#94A3B8] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((note) => (
          <div
            key={note.id}
            className="group flex flex-col rounded-2xl border border-white/[0.08] bg-white/5 p-5 transition-colors hover:border-[#3B82F6]/40"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#60A5FA]">
                <StickyNote className="h-4.5 w-4.5" />
              </span>
              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-white/5 hover:text-white" aria-label="View">
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-white/5 hover:text-white" aria-label="Edit">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-[#EF4444]/10 hover:text-[#EF4444]" aria-label="Delete">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">{note.title}</h3>
            <p className="mt-1.5 flex-1 text-xs leading-relaxed text-[#94A3B8]">
              {note.preview}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3">
              <span className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[10px] text-[#94A3B8]">
                {note.category}
              </span>
              <span className="text-[10px] text-[#94A3B8]">{note.updated}</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-white/[0.12] py-14 text-center text-sm text-[#94A3B8]">
            No notes match your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureNotes;
