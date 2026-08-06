import { useEffect, useState,useRef } from "react";
import {
  User,
  Lock,
  Monitor,
  AlertTriangle,
  Camera,
  X,
} from "lucide-react";
import {
  getMe,
  updateProfile,
  updateMasterPassword,
  setup2FA,
  verify2FASetup,
  updateAvatar,
  disable2FA,
  logoutAllDevices,
  deleteAccount,
} from "../services/settings.service";
import { getActivityLogs } from "../services/activity.service";

const initials = (name = "") =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Settings = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Profile form
  const [profileForm, setProfileForm] = useState({ name: "", email: "" });
  const [profileStatus, setProfileStatus] = useState("");
const [uploadingAvatar, setUploadingAvatar] = useState(false);
const fileInputRef = useRef(null);

  // Master password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordStatus, setPasswordStatus] = useState("");

  // 2FA
  const [twoFAStep, setTwoFAStep] = useState(null); // null | "setup" | "disable"
  const [qrCode, setQrCode] = useState("");
  const [manualEntryKey, setManualEntryKey] = useState("");
  const [twoFACode, setTwoFACode] = useState("");
  const [disablePassword, setDisablePassword] = useState("");
  const [twoFAStatus, setTwoFAStatus] = useState("");

  // Sessions (simplified: recent logins + logout-all)
  const [recentLogins, setRecentLogins] = useState([]);
  const [loggingOutAll, setLoggingOutAll] = useState(false);

  // Delete account
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteStatus, setDeleteStatus] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const me = await getMe();
        setUser(me);
        setProfileForm({ name: me.name, email: me.email });
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUser(false);
      }
    };

   

    const loadLogins = async () => {
      try {
        const logs = await getActivityLogs("Login");
        setRecentLogins(logs.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };

    load();
    loadLogins();
  }, []);

   const handleAvatarChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploadingAvatar(true);
  try {
    const res = await updateAvatar(file);
    setUser((u) => ({ ...u, avatar: res.avatar }));
  } catch (err) {
    console.error(err);
  } finally {
    setUploadingAvatar(false);
    e.target.value = ""; // same file dobara select ho sake
  }
};
  // Only logins that happened after the last tokenVersion bump (password
  // change / logout-all) are still on valid tokens — everything before
  // that was invalidated, so filter it out of "Active Sessions".
  const activeSessions = user?.tokenVersionUpdatedAt
    ? recentLogins.filter(
        (login) => new Date(login.createdAt) >= new Date(user.tokenVersionUpdatedAt)
      )
    : recentLogins;

  // ---------- Profile ----------
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileStatus("");
    try {
      const res = await updateProfile(profileForm);
      setUser(res.user);
      setProfileStatus("Profile updated.");
    } catch (err) {
      setProfileStatus(err.response?.data?.message || "Failed to update profile.");
    }
  };

  // ---------- Master password ----------
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordStatus("");
    try {
      const res = await updateMasterPassword(passwordForm);
      setPasswordStatus(res.message || "Password updated.");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      window.location.href = "/login";
    } catch (err) {
      setPasswordStatus(err.response?.data?.message || "Failed to update password.");
    }
  };

  // ---------- 2FA ----------
  const startEnable2FA = async () => {
    setTwoFAStatus("");
    try {
      const res = await setup2FA();
      setQrCode(res.qrCode);
      setManualEntryKey(res.manualEntryKey);
      setTwoFAStep("setup");
    } catch (err) {
      setTwoFAStatus(err.response?.data?.message || "Failed to start 2FA setup.");
    }
  };

  const confirmEnable2FA = async (e) => {
    e.preventDefault();
    setTwoFAStatus("");
    try {
      await verify2FASetup(twoFACode);
      setUser((u) => ({ ...u, twoFactorEnabled: true }));
      setTwoFAStep(null);
      setTwoFACode("");
    } catch (err) {
      setTwoFAStatus(err.response?.data?.message || "Invalid code.");
    }
  };

  const confirmDisable2FA = async (e) => {
    e.preventDefault();
    setTwoFAStatus("");
    try {
      await disable2FA(disablePassword);
      setUser((u) => ({ ...u, twoFactorEnabled: false }));
      setTwoFAStep(null);
      setDisablePassword("");
    } catch (err) {
      setTwoFAStatus(err.response?.data?.message || "Failed to disable 2FA.");
    }
  };

  // ---------- Sessions ----------
  const handleLogoutAll = async () => {
    setLoggingOutAll(true);
    try {
      await logoutAllDevices();
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      setLoggingOutAll(false);
    }
  };

  // ---------- Delete account ----------
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setDeleteStatus("");
    try {
      await deleteAccount(deletePassword);
      window.location.href = "/login";
    } catch (err) {
      setDeleteStatus(err.response?.data?.message || "Failed to delete account.");
    }
  };

  if (loadingUser) {
    return <p className="text-sm text-[#94A3B8]">Loading settings...</p>;
  }

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
    {user?.avatar ? (
      <img src={user.avatar} alt="Avatar" className="h-16 w-16 rounded-2xl object-cover" />
    ) : (
      initials(user?.name)
    )}
  </div>
  <input
    type="file"
    accept="image/png, image/jpeg"
    ref={fileInputRef}
    onChange={handleAvatarChange}
    className="hidden"
  />
  <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    disabled={uploadingAvatar}
    className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.08] bg-[#0F172A] text-[#94A3B8] transition-colors hover:text-white disabled:opacity-50"
    aria-label="Change avatar"
  >
    <Camera className="h-3 w-3" />
  </button>
</div>
          <div>
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-[#94A3B8]">JPG or PNG, up to 2MB</p>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">Full name</label>
            <input
              type="text"
              value={profileForm.name}
              onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#3B82F6]/60"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">Email</label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#3B82F6]/60"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#60A5FA]"
            >
              Save Changes
            </button>
            {profileStatus && <p className="mt-2 text-xs text-[#94A3B8]">{profileStatus}</p>}
          </div>
        </form>
      </div>

      {/* Security Settings */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Lock className="h-4.5 w-4.5 text-[#60A5FA]" />
          <h2 className="text-sm font-semibold text-white">Security Settings</h2>
        </div>

        <div className="mt-5 space-y-4">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
                  Current password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm((f) => ({ ...f, currentPassword: e.target.value }))
                  }
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
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((f) => ({ ...f, newPassword: e.target.value }))}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
                  Confirm new password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordForm.confirmNewPassword}
                  onChange={(e) =>
                    setPasswordForm((f) => ({ ...f, confirmNewPassword: e.target.value }))
                  }
                  className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60"
                />
              </div>
            </div>
            <button
              type="submit"
              className="rounded-xl border border-white/[0.08] bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Update Master Password
            </button>
            {passwordStatus && <p className="text-xs text-[#94A3B8]">{passwordStatus}</p>}
          </form>

          {/* 2FA */}
          <div className="pt-2">
            <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5">
              <div>
                <p className="text-sm text-white">Two-Factor Authentication</p>
                <p className="mt-0.5 text-xs text-[#94A3B8]">
                  Require a verification code in addition to your password.
                </p>
              </div>
              <button
  type="button"
  onClick={() => (user?.twoFactorEnabled ? setTwoFAStep("disable") : startEnable2FA())}
  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
    user?.twoFactorEnabled ? "bg-[#3B82F6]" : "bg-white/10"
  }`}
  aria-label="Toggle Two-Factor Authentication"
>
  <span
    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
      user?.twoFactorEnabled ? "translate-x-6" : "translate-x-1"
    }`}
  />
</button>
            </div>
          </div>

          {/* Sessions (simplified) */}
          <div className="pt-2">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-[#60A5FA]" />
                <p className="text-sm font-medium text-white">Active Sessions</p>
              </div>
              <button
                type="button"
                onClick={handleLogoutAll}
                disabled={loggingOutAll}
                className="text-xs font-medium text-[#EF4444] hover:text-white disabled:opacity-50"
              >
                {loggingOutAll ? "Logging out..." : "Log out all devices"}
              </button>
            </div>
            <div className="space-y-2">
              {activeSessions.length === 0 && (
                <p className="text-xs text-[#94A3B8]">No active sessions found.</p>
              )}
              {activeSessions.map((login) => (
                <div
                  key={login._id}
                  className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
                >
                  <div>
                    <p className="text-sm text-white">{login.device}</p>
                    <p className="mt-0.5 text-xs text-[#94A3B8]">{login.location}</p>
                  </div>
                  <p className="text-xs text-[#94A3B8]">
                    {new Date(login.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="mt-4 rounded-xl border border-[#EF4444]/40 bg-[#EF4444]/10 px-5 py-2.5 text-sm font-semibold text-[#EF4444] transition-colors hover:bg-[#EF4444] hover:text-white"
        >
          Delete Account
        </button>
      </div>

      {/* 2FA Setup Modal */}
      {twoFAStep === "setup" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#0F172A] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Enable Two-Factor Authentication</h3>
              <button onClick={() => setTwoFAStep(null)} aria-label="Close">
                <X className="h-4 w-4 text-[#94A3B8] hover:text-white" />
              </button>
            </div>
            <p className="mt-2 text-xs text-[#94A3B8]">
              Scan this QR code with your authenticator app, then enter the 6-digit code.
            </p>
            {qrCode && (
              <img src={qrCode} alt="2FA QR Code" className="mx-auto mt-4 h-40 w-40 rounded-lg bg-white p-2" />
            )}
            {manualEntryKey && (
              <p className="mt-2 break-all text-center text-[10px] text-[#94A3B8]">
                Manual entry key: {manualEntryKey}
              </p>
            )}
            <form onSubmit={confirmEnable2FA} className="mt-4 space-y-3">
              <input
                type="text"
                inputMode="numeric"
                placeholder="6-digit code"
                value={twoFACode}
                onChange={(e) => setTwoFACode(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-center text-sm text-white outline-none focus:border-[#3B82F6]/60"
              />
              {twoFAStatus && <p className="text-xs text-[#EF4444]">{twoFAStatus}</p>}
              <button
                type="submit"
                className="w-full rounded-xl bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#60A5FA]"
              >
                Verify & Enable
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2FA Disable Modal */}
      {twoFAStep === "disable" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#0F172A] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Disable Two-Factor Authentication</h3>
              <button onClick={() => setTwoFAStep(null)} aria-label="Close">
                <X className="h-4 w-4 text-[#94A3B8] hover:text-white" />
              </button>
            </div>
            <p className="mt-2 text-xs text-[#94A3B8]">Confirm your password to disable 2FA.</p>
            <form onSubmit={confirmDisable2FA} className="mt-4 space-y-3">
              <input
                type="password"
                placeholder="••••••••"
                value={disablePassword}
                onChange={(e) => setDisablePassword(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#3B82F6]/60"
              />
              {twoFAStatus && <p className="text-xs text-[#EF4444]">{twoFAStatus}</p>}
              <button
                type="submit"
                className="w-full rounded-xl border border-[#EF4444]/40 bg-[#EF4444]/10 px-5 py-2.5 text-sm font-semibold text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
              >
                Disable 2FA
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-[#EF4444]/30 bg-[#0F172A] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Delete Account</h3>
              <button onClick={() => setShowDeleteModal(false)} aria-label="Close">
                <X className="h-4 w-4 text-[#94A3B8] hover:text-white" />
              </button>
            </div>
            <p className="mt-2 text-xs text-[#94A3B8]">
              This permanently deletes your vault and account. Enter your password to confirm.
            </p>
            <form onSubmit={handleDeleteAccount} className="mt-4 space-y-3">
              <input
                type="password"
                placeholder="••••••••"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#EF4444]/60"
              />
              {deleteStatus && <p className="text-xs text-[#EF4444]">{deleteStatus}</p>}
              <button
                type="submit"
                className="w-full rounded-xl bg-[#EF4444] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#EF4444]/90"
              >
                Permanently Delete Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
