import api from "../api/axios";

export const getSecurityOverview = async () => {
  const res = await api.get("/security/overview");
  return res.data.data;
};