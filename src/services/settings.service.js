import api from "../api/axios";

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.user;
};

export const updateProfile = async ({ name, email }) => {
  const res = await api.put("/settings/profile", { name, email });
  return res.data;
};

export const updateAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await api.put("/settings/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
export const updateMasterPassword = async ({ currentPassword, newPassword, confirmNewPassword }) => {
  const res = await api.put("/settings/password", {
    currentPassword,
    newPassword,
    confirmNewPassword,
  });
  return res.data;
};

export const setup2FA = async () => {
  const res = await api.post("/settings/2fa/setup");
  return res.data; // { qrCode, manualEntryKey }
};

export const verify2FASetup = async (token) => {
  const res = await api.post("/settings/2fa/verify", { token });
  return res.data;
};

export const disable2FA = async (password) => {
  const res = await api.post("/settings/2fa/disable", { password });
  return res.data;
};

export const logoutAllDevices = async () => {
  const res = await api.post("/settings/logout-all");
  return res.data;
};

export const deleteAccount = async (password) => {
  const res = await api.delete("/settings/account", { data: { password } });
  return res.data;
};