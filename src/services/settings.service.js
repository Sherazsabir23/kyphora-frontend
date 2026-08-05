import api from "../api/axios";

export const updateProfile = async (data) => {
  const res = await api.put("/settings/profile", data);
  return res.data.data;
};

export const updateAvatar = async (formData) => {
  const res = await api.put("/settings/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updateMasterPassword = async (currentPassword, newPassword) => {
  const res = await api.put("/settings/password", { currentPassword, newPassword });
  return res.data.data;
};

export const setup2FA = async () => {
  // returns { qrCode, secret }
  const res = await api.post("/settings/2fa/setup");
  return res.data.data;
};

export const verify2FA = async (code) => {
  const res = await api.post("/settings/2fa/verify", { code });
  return res.data.data;
};

export const disable2FA = async (code) => {
  const res = await api.post("/settings/2fa/disable", { code });
  return res.data.data;
};

export const logoutAllDevices = async () => {
  const res = await api.post("/settings/logout-all");
  return res.data;
};

export const deleteAccount = async (password) => {
  const res = await api.delete("/settings/account", { data: { password } });
  return res.data;
};