import { useState, useEffect } from "react";
import {
  User,
  Lock,
  Monitor,
  AlertTriangle,
  Camera,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice"; 
import {
  updateProfile,
  updateAvatar,
  updateMasterPassword,
  setup2FA,
  verify2FA,
  disable2FA,
  logoutAllDevices,
  deleteAccount,
} from "../services/settings.service";
import { getActivityLogs } from "../services/activity.service"; // apna function name check kar lena

const ToggleRow = ({ label, description, checked, onChange, disabled }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5">
      <div>
        <p className="text-sm text-white">{label}</p>
        {description && <p className="mt-0.5 text-xs text-[#94A3B8]">{description}</p>}
      </div>
      <button
        onClick={onChange}
        disabled={disabled}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-[#3B82F6]" : "bg-white/10"
        } ${disabled ? "opacity-50" : ""}`}
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
const dispatch = useDispatch();
const { user } = useSelector((state) => state.auth);// apne context ke actual shape ke hisab se adjust karna

  // Profile
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileSaving, setProfileSaving] = useState(false);

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // 2FA
  const [twoFAEnabled, setTwoFAEnabled] = useState(user?.twoFactorEnabled || false);
  const [qrCode, setQrCode] = useState(null);
  const [totpCode, setTotpCode] = useState("");
  const [twoFAMode, setTwoFAMode] = useState(null); // "setup" | "disable" | null
  const [twoFAError, setTwoFAError] = useState("");

  // Sessions (simple version)
  const [recentLogins, setRecentLogins] = useState([]);
  const [loggingOutAll, setLoggingOutAll] = useState(false);

  // Delete account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const data = await getActivityLogs({ type: "Login" });
        setRecentLogins(data.slice(0, 5));
      } catch (err) {
        console.error("Failed to load recent logins:", err);
      }
    };
    fetchLogins();
  }, []);

  const handleProfileSave = async () => {
    setProfileSaving(true);
    try {
      const updated = await updateProfile({ name, email });
      setUser?.((prev) => ({ ...prev, ...updated }));
    } catch (err) {
      console.error("Profile update failed:", err);
    } finally {
      setProfileSaving(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const updated = await updateAvatar(formData);
      setUser?.((prev) => ({ ...prev, ...updated }));
    } catch (err) {
      console.error("Avatar update failed:", err);
    }
  };

  const handlePasswordUpdate = async () => {
    setPasswordError("");
    setPasswordSaving(true);
    try {
      await updateMasterPassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPasswordError(err.response?.data?.message || "Failed to update password");
    } finally {
      setPasswordSaving(false);
    }
  };

  const handle2FAToggleClick = async () => {
    setTwoFAError("");
    if (twoFAEnabled) {
      setTwoFAMode("disable");
    } else {
      try {
        const data = await setup2FA();
        setQrCode(data.qrCode);
        setTwoFAMode("setup");
      } catch (err) {
        setTwoFAError(err.response?.data?.message || "Failed to start 2FA setup");
      }
    }
  };

  const handle2FAVerify = async () => {
    setTwoFAError("");
    try {
      await verify2FA(totpCode);
      setTwoFAEnabled(true);
      setTwoFAMode(null);
      setQrCode(null);
      setTotpCode("");
    } catch (err) {
      setTwoFAError(err.response?.data?.message || "Invalid code");
    }
  };

  const handle2FADisable = async () => {
    setTwoFAError("");
    try {
      await disable2FA(totpCode);
      setTwoFAEnabled(false);
      setTwoFAMode(null);
      setTotpCode("");
    } catch (err) {
      setTwoFAError(err.response?.data?.message || "Invalid code");
    }
  };

  const handleLogoutAll = async () => {
    setLoggingOutAll(true);
    try {
      await logoutAllDevices();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout all failed:", err);
    } finally {
      setLoggingOutAll(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await deleteAccount(deletePassword);
      window.location.href = "/login";
    } catch (err) {
      console.error("Delete account failed:", err);
      setDeleting(false);
    }
  };

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
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-xl font-semibold text-white overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                name?.slice(0, 2).toUpperCase() || "U"
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-1 -right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white/[0.08] bg-[#0F172A] text-[#94A3B8] transition-colors hover:text-white"
            >
              <Camera className="h-3 w-3" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <div>
            <p className="text-sm font-medium text-white">{name}</p>
            <p className="text-xs text-[#94A3B8]">JPG or PNG, up to 2MB</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#3B82F6]/60"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#3B82F6]/60"
            />
          </div>
        </div>

        <button
          onClick={handleProfileSave}
          disabled={profileSaving}
          className="mt-5 rounded-xl bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#60A5FA] disabled:opacity-60"
        >
          {profileSaving ? "Saving..." : "Save Changes"}
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
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60"
              />
            </div>
          </div>
          {passwordError && <p className="text-xs text-[#EF4444]">{passwordError}</p>}
          <button
            onClick={handlePasswordUpdate}
            disabled={passwordSaving}
            className="rounded-xl border border-white/[0.08] bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-60"
          >
            {passwordSaving ? "Updating..." : "Update Master Password"}
          </button>

          {/* 2FA */}
          <div className="pt-2 space-y-3">
            <ToggleRow
              label="Two-Factor Authentication"
              description="Require a verification code in addition to your password."
              checked={twoFAEnabled}
              onChange={handle2FAToggleClick}
            />

            {twoFAMode === "setup" && (
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 space-y-3">
                <p className="text-xs text-[#94A3B8]">
                  Scan this QR code with your authenticator app, then enter the 6-digit code.
                </p>
                {qrCode && (
                  <img src={qrCode} alt="2FA QR code" className="h-40 w-40 rounded-lg bg-white p-2" />
                )}
                <input
                  type="text"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  placeholder="123456"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none focus:border-[#3B82F6]/60"
                />
                {twoFAError && <p className="text-xs text-[#EF4444]">{twoFAError}</p>}
                <div className="flex gap-2">
                  <button
                    onClick={handle2FAVerify}
                    className="rounded-xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#60A5FA]"
                  >
                    Verify & Enable
                  </button>
                  <button
                    onClick={() => { setTwoFAMode(null); setQrCode(null); setTotpCode(""); }}
                    className="rounded-xl border border-white/[0.08] px-4 py-2 text-sm text-[#94A3B8] hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {twoFAMode === "disable" && (
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 space-y-3">
                <p className="text-xs text-[#94A3B8]">
                  Enter your current 6-digit code to disable Two-Factor Authentication.
                </p>
                <input
                  type="text"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  placeholder="123456"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none focus:border-[#3B82F6]/60"
                />
                {twoFAError && <p className="text-xs text-[#EF4444]">{twoFAError}</p>}
                <div className="flex gap-2">
                  <button
                    onClick={handle2FADisable}
                    className="rounded-xl bg-[#EF4444] px-4 py-2 text-sm font-semibold text-white hover:bg-[#EF4444]/80"
                  >
                    Confirm Disable
                  </button>
                  <button
                    onClick={() => { setTwoFAMode(null); setTotpCode(""); }}
                    className="rounded-xl border border-white/[0.08] px-4 py-2 text-sm text-[#94A3B8] hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sessions — simple version */}
          <div className="pt-2">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-[#60A5FA]" />
                <p className="text-sm font-medium text-white">Recent Logins</p>
              </div>
              <button
                onClick={handleLogoutAll}
                disabled={loggingOutAll}
                className="text-xs font-medium text-[#EF4444] hover:text-white disabled:opacity-60"
              >
                {loggingOutAll ? "Logging out..." : "Log out all devices"}
              </button>
            </div>
            <div className="space-y-2">
              {recentLogins.length === 0 ? (
                <p className="text-xs text-[#94A3B8]">No recent logins found.</p>
              ) : (
                recentLogins.map((log) => (
                  <div
                    key={log._id}
                    className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
                  >
                    <div>
                      <p className="text-sm text-white">{log.device}</p>
                      <p className="mt-0.5 text-xs text-[#94A3B8]">{log.location}</p>
                    </div>
                    <p className="text-xs text-[#94A3B8]">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
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

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="mt-4 rounded-xl border border-[#EF4444]/40 bg-[#EF4444]/10 px-5 py-2.5 text-sm font-semibold text-[#EF4444] transition-colors hover:bg-[#EF4444] hover:text-white"
          >
            Delete Account
          </button>
        ) : (
          <div className="mt-4 space-y-3">
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Enter your password to confirm"
              className="w-full rounded-xl border border-[#EF4444]/30 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none focus:border-[#EF4444]/60"
            />
            <div className="flex gap-2">
              <button
                onClick={handleDeleteAccount}
                disabled={deleting || !deletePassword}
                className="rounded-xl bg-[#EF4444] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#EF4444]/80 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
              <button
                onClick={() => { setShowDeleteConfirm(false); setDeletePassword(""); }}
                className="rounded-xl border border-white/[0.08] px-5 py-2.5 text-sm text-[#94A3B8] hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;