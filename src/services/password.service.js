import api from "../api/axios";

export const createPassword = (data) =>
  api.post("/passwords", data);

export const getPasswords = (params) =>
  api.get("/passwords", { params });

export const getPassword = (id) =>
  api.get(`/passwords/${id}`);

export const updatePassword = (id, data) =>
  api.put(`/passwords/${id}`, data);

export const deletePassword = (id) =>
  api.delete(`/passwords/${id}`);