import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ShieldAlert,
  Sun,
  Moon,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const DashboardNavbar = ({ title = "Dashboard", onMenuClick }) => {
  const [dark, setDark] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#050816]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        {/* Left */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            onClick={onMenuClick}
            className="text-[#94A3B8] hover:text-white lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <h1 className="hidden shrink-0 text-lg font-semibold text-white md:block">
            {title}
          </h1>

          <div className="relative ml-0 hidden max-w-sm flex-1 sm:block md:ml-4">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search vault..."
              className="w-full rounded-xl border border-white/[0.08] bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60 focus:bg-white/[0.07]"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
          </button>

          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Security alerts"
          >
            <ShieldAlert className="h-4.5 w-4.5" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
          </button>

          <button
            onClick={() => setDark((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Toggle theme"
          >
            {dark ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
          </button>

          <div className="relative ml-1">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-white/5"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-[11px] font-semibold text-white">
                JL
              </div>
              <ChevronDown
                className={`hidden h-3.5 w-3.5 text-[#94A3B8] transition-transform sm:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileOpen(false)}
                />
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-white/[0.08] bg-[#0F172A] p-1.5 shadow-2xl">
                  <div className="px-3 py-2.5">
                    <p className="text-sm font-medium text-white">Jordan Lee</p>
                    <p className="text-xs text-[#94A3B8]">jordan@kyphora.com</p>
                  </div>
                  <div className="my-1 border-t border-white/[0.08]" />
                  <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white">
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <div className="my-1 border-t border-white/[0.08]" />
                  <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#EF4444] transition-colors hover:bg-[#EF4444]/10">
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search row */}
      <div className="px-4 pb-3.5 sm:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search vault..."
            className="w-full rounded-xl border border-white/[0.08] bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60 focus:bg-white/[0.07]"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
