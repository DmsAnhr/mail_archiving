import { useState, useEffect } from 'react';
import { getCategories, deleteCategory } from '../services/serviceCategory';

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const params = { search };
      const data = await getCategories(params);
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSearch = () => {
    fetchCategories();
  }

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (err) {
      setError('Failed to delete category');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, search, setSearch, handleSubmitSearch, fetchCategories, handleDeleteCategory };
};

export default useCategory;
