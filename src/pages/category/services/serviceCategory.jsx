import axiosInstance from '../../../utils/axiosInstance';

export const getCategories = async (params) => {
  const response = await axiosInstance.get(`/categories`, {
    params,
  });
  return response.data.data;
};

export const getCategoryById = async (id) => {
  const response = await axiosInstance.get(`/categories/${id}`);
  return response.data.data;
};

export const createCategory = async (data) => {
  const response = await axiosInstance.post(`/categories`, data);
  return response.data;
};

export const updateCategory = async (id, data) => {
  const response = await axiosInstance.put(`/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/categories/${id}`);
  return response.data;
};
