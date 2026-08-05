import api from "../api/axios";

// Get all documents
export const getDocuments = () =>
  api.get("/documents");

// Upload document
export const createDocument = (formData) =>
  api.post("/documents", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Update document
export const updateDocument = (id, formData) =>
  api.put(`/documents/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Delete document
export const deleteDocument = (id) =>
  api.delete(`/documents/${id}`);

// Download document
export const downloadDocument = (id) =>
  api.get(`/documents/download/${id}`, {
    responseType: "blob",
  });

  export const previewDocument = (id) =>
  api.get(`/documents/${id}/preview`, {
    responseType: "blob",
  });