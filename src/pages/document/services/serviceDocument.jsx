import axiosInstance from '../../../utils/axiosInstance';

export const getCategories = async () => {
  const response = await axiosInstance.get(`/categories/all`);
  return response.data.data;
};

export const getDocumentById = async (id) => {
  try {
    const response = await axiosInstance.get(`/documents/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};

export const createDocument = async (formData) => {
  try {
    const response = await axiosInstance.post(`/documents`, formData);
    return response.data;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const updateDocument = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`/documents/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const getFile = async (id) => {
  try {
    const response = await axiosInstance.get(`/documents/file/${id}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};
