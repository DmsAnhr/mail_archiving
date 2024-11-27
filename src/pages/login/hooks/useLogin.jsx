import { useState } from 'react';
import { login } from '../services/serviceLogin';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.data.token);
      setLoading(false);
      window.location.href = '/';
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};

export default useLogin;
