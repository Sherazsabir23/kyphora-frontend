import api from "../api/axios";

export const getCards = () => {
  return api.get("/cards");
};

export const getCard = (id) => {
  return api.get(`/cards/${id}`);
};

export const createCard = (data) => {
  return api.post("/cards", data);
};

export const updateCard = (id, data) => {
  return api.put(`/cards/${id}`, data);
};

export const deleteCard = (id) => {
  return api.delete(`/cards/${id}`);
};