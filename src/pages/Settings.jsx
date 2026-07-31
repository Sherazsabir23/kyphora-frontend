import { useState } from "react";
import {
  User,
  Lock,
  ShieldCheck,
  Monitor,
  Bell,
  Palette,
  AlertTriangle,
  Camera,
} from "lucide-react";

const sessions = [
  { id: 1, device: "Chrome · Windows 11", location: "Austin, TX", current: true },
  { id: 2, device: "Kyphora App · iPhone 16", location: "Austin, TX", current: false },
  { id: 3, device: "Safari · macOS", location: "Dallas, TX", current: false },
];

const ToggleRow = ({ label, description, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5">
      <div>
        <p className="text-sm text-white">{label}</p>
        {description && <p className="mt-0.5 text-xs text-[#94A3B8]">{description}</p>}
      </div>
      <button
        onClick={() => setChecked((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-[#3B82F6]" : "bg-white/10"
        }`}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

const Settings = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Settings</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Manage your profile, security, and account preferences.
        </p>
      </div>

      {/* Profile Settings */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <User className="h-4.5 w-4.5 text-[#60A5FA]" />
          <h2 className="text-sm font-semibold text-white">Profile Settings</h2>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-xl font-semibold text-white">
              JL
            </div>
            <button
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.08] bg-[#0F172A] text-[#94A3B8] transition-colors hover:text-white"
              aria-label="Change avatar"
            >
              <Camera className="h-3 w-3" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Jordan Lee</p>
            <p className="text-xs text-[#94A3B8]">JPG or PNG, up to 2MB</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">Full name</label>
            <input
              type="text"
              defaultValue="Jordan Lee"
              className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#3B82F6]/60"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">Email</label>
            <input
              type="email"
              defaultValue="jordan@kyphora.com"
              className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#3B82F6]/60"
            />
          </div>
        </div>

        <button className="mt-5 rounded-xl bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#60A5FA]">
          Save Changes
        </button>
      </div>

      {/* Security Settings */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Lock className="h-4.5 w-4.5 text-[#60A5FA]" />
          <h2 className="text-sm font-semibold text-white">Security Settings</h2>
        </div>

        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
                Current password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
                New master password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60"
              />
            </div>
          </div>
          <button className="rounded-xl border border-white/[0.08] bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            Update Master Password
          </button>

          <div className="pt-2">
            <ToggleRow
              label="Two-Factor Authentication"
              description="Require a verification code in addition to your password."
              defaultChecked
            />
          </div>

          {/* Session management */}
          <div className="pt-2">
            <div className="mb-3 flex items-center gap-2">
              <Monitor className="h-4 w-4 text-[#60A5FA]" />
              <p className="text-sm font-medium text-white">Active Sessions</p>
            </div>
            <div className="space-y-2">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
                >
                  <div>
                    <p className="text-sm text-white">
                      {session.device}
                      {session.current && (
                        <span className="ml-2 rounded-full bg-[#22C55E]/15 px-2 py-0.5 text-[10px] font-medium text-[#22C55E]">
                          This device
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-[#94A3B8]">{session.location}</p>
                  </div>
                  {!session.current && (
                    <button className="text-xs font-medium text-[#EF4444] hover:text-white">
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Palette className="h-4.5 w-4.5 text-[#60A5FA]" />
          <h2 className="text-sm font-semibold text-white">Preferences</h2>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5">
            <div>
              <p className="text-sm text-white">Theme</p>
              <p className="mt-0.5 text-xs text-[#94A3B8]">Kyphora currently runs in dark mode</p>
            </div>
            <select className="rounded-lg border border-white/[0.08] bg-[#0F172A] px-3 py-1.5 text-sm text-white outline-none">
              <option>Dark</option>
              <option>Light (coming soon)</option>
              <option>System</option>
            </select>
          </div>

          <ToggleRow
            label="Email Notifications"
            description="Get notified about security alerts and account activity."
            defaultChecked
          />
          <ToggleRow
            label="Push Notifications"
            description="Receive alerts on your mobile device."
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl border border-[#EF4444]/30 bg-[#EF4444]/5 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4.5 w-4.5 text-[#EF4444]" />
          <h2 className="text-sm font-semibold text-white">Danger Zone</h2>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">
          Deleting your account permanently removes your vault and all stored data.
          This action cannot be undone.
        </p>
        <button className="mt-4 rounded-xl border border-[#EF4444]/40 bg-[#EF4444]/10 px-5 py-2.5 text-sm font-semibold text-[#EF4444] transition-colors hover:bg-[#EF4444] hover:text-white">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
