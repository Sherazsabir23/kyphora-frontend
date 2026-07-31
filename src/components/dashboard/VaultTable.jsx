import { useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
  Globe,
  StickyNote,
  CreditCard,
  Code2,
} from "lucide-react";

const categoryIcon = {
  Login: Globe,
  Note: StickyNote,
  Card: CreditCard,
  "API Key": Code2,
};

const defaultItems = [
  { id: 1, name: "GitHub", username: "jordan.lee", category: "Login", updated: "2026-07-28" },
  { id: 2, name: "Google Workspace", username: "jordan@kyphora.com", category: "Login", updated: "2026-07-27" },
  { id: 3, name: "Server Root Note", username: "—", category: "Note", updated: "2026-07-25" },
  { id: 4, name: "Amex Business", username: "•••• 4821", category: "Card", updated: "2026-07-20" },
  { id: 5, name: "Stripe Live Key", username: "sk_live_••••", category: "API Key", updated: "2026-07-18" },
  { id: 6, name: "AWS Console", username: "jordan.lee-admin", category: "Login", updated: "2026-07-15" },
];

const categories = ["All", "Login", "Note", "Card", "API Key"];

const VaultTable = ({ items = defaultItems }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    let rows = items.filter((item) => {
      const matchesQuery =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.username.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      return matchesQuery && matchesCategory;
    });

    rows = [...rows].sort((a, b) =>
      sortAsc ? a.updated.localeCompare(b.updated) : b.updated.localeCompare(a.updated)
    );

    return rows;
  }, [items, query, category, sortAsc]);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/5">
      {/* Controls */}
      <div className="flex flex-col gap-3 border-b border-white/[0.08] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vault..."
            className="w-full rounded-xl border border-white/[0.08] bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/5 px-3.5 py-2.5 text-sm text-[#94A3B8] transition-colors hover:text-white"
            >
              {category}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {filterOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setFilterOpen(false)} />
                <div className="absolute right-0 z-50 mt-2 w-40 rounded-xl border border-white/[0.08] bg-[#0F172A] p-1.5 shadow-2xl">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setFilterOpen(false);
                      }}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        category === cat
                          ? "bg-[#3B82F6]/15 text-white"
                          : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setSortAsc((v) => !v)}
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/5 px-3.5 py-2.5 text-sm text-[#94A3B8] transition-colors hover:text-white"
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            {sortAsc ? "Oldest" : "Newest"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wide text-[#94A3B8]">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Username</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Last Updated</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const Icon = categoryIcon[item.category] ?? Globe;
              return (
                <tr
                  key={item.id}
                  className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#60A5FA]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="font-medium text-white">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#94A3B8]">{item.username}</td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-full border border-white/[0.08] px-2.5 py-1 text-xs text-[#94A3B8]">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[#94A3B8]">{item.updated}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="rounded-lg p-2 text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white"
                        aria-label={`View ${item.name}`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-2 text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white"
                        aria-label={`Edit ${item.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-2 text-[#94A3B8] transition-colors hover:bg-[#EF4444]/10 hover:text-[#EF4444]"
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-[#94A3B8]">
                  No vault items match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VaultTable;
