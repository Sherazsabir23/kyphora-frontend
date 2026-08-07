import api from "../api/axios";

export const getDashboardOverview = async () => {
  const res = await api.get("/dashboard/overview");
  return res.data.data;
};