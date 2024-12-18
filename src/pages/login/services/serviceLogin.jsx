import axios from 'axios';
import { API_URL } from '../../../utils/Constant';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data || { message: 'An error occurred' };
  }
};
