import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  KeyRound,
  ChevronDown,
  Wand2,
  ShieldCheck,
  History,
  Settings,
  Lock,
  StickyNote,
  CreditCard,
  Code2,
  FileText,
  X,
} from "lucide-react";

const vaultItems = [
  { label: "Passwords", icon: Lock, to: "/dashboard/vault/passwords" },
  { label: "Secure Notes", icon: StickyNote, to: "/dashboard/vault/notes" },
  { label: "Credit Cards", icon: CreditCard, to: "/dashboard/vault/cards" },
  { label: "API Keys", icon: Code2, to: "/dashboard/vault/api-keys" },
  { label: "Documents", icon: FileText, to: "/dashboard/vault/documents" },
];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Password Generator", icon: Wand2, to: "/dashboard/generator" },
  { label: "Security Center", icon: ShieldCheck, to: "/dashboard/security" },
  { label: "Activity Logs", icon: History, to: "/dashboard/activity" },
  { label: "Settings", icon: Settings, to: "/dashboard/settings" },
];

const linkBase =
  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors";
const linkActive = "bg-[#3B82F6]/15 text-white";
const linkInactive = "text-[#94A3B8] hover:bg-white/5 hover:text-white";

const Sidebar = ({ open, onClose }) => {
  const [vaultOpen, setVaultOpen] = useState(true);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col border-r border-white/[0.08] bg-[#0F172A] transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#60A5FA]">
              <Lock className="h-4 w-4" />
            </span>
            <span className="text-base font-semibold tracking-tight text-white">
              Kyphora
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            <LayoutDashboard className="h-4.5 w-4.5" />
            Dashboard
          </NavLink>

          {/* Vault with submenu */}
          <div>
            <button
              onClick={() => setVaultOpen((v) => !v)}
              className={`${linkBase} w-full justify-between ${linkInactive}`}
            >
              <span className="flex items-center gap-3">
                <KeyRound className="h-4.5 w-4.5" />
                Vault
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${vaultOpen ? "rotate-180" : ""}`}
              />
            </button>

            {vaultOpen && (
              <div className="mt-1 space-y-1 pl-4">
                {vaultItems.map(({ label, icon: Icon, to }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors ${
                        isActive ? linkActive : linkInactive
                      }`
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {navItems.slice(1).map(({ label, icon: Icon, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              <Icon className="h-4.5 w-4.5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;