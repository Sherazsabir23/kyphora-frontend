import api from "../api/axios";

export const getActivityLogs = async (type) => {
  const res = await api.get("/activity", {
    params: type && type !== "All Activity" ? { type } : {},
  });
  return res.data.data;
};