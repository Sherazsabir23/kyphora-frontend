import axios from "../api/axios";

export const getApiKeys = async () => {
  const { data } = await axios.get("/api-keys");
  return data;
};

export const createApiKey = async (payload) => {
  const { data } = await axios.post("/api-keys", payload);
  return data;
};

export const updateApiKey = async (id, payload) => {
  const { data } = await axios.put(`/api-keys/${id}`, payload);
  return data;
};

export const deleteApiKey = async (id) => {
  const { data } = await axios.delete(`/api-keys/${id}`);
  return data;
};