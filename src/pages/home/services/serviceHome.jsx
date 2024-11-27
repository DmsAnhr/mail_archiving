import axiosInstance from '../../../utils/axiosInstance';

export const fetchDocuments = async (params) => {
  try {
    const response = await axiosInstance.get(`/documents`, {
      params,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const deleteDocument = async (id) => {
  try {
    const response = await axiosInstance.delete(`/documents/${id}`);

    return response.data;
  } catch (error) {
    console.error('Error deleting document:', error);
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
