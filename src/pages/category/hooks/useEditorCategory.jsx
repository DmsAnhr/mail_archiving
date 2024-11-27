import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById, createCategory, updateCategory } from '../services/serviceCategory';

const useEditorCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);
  const [form, setForm] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchCategory = async () => {
        try {
          setLoading(true);
          const data = await getCategoryById(id);
          setForm({ name: data[0].name, description: data[0].description });
        } catch (err) {
          setError('Failed to fetch category');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCategory();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (isEditMode) {
        await updateCategory(id, form);
      } else {
        await createCategory(form);
      }
      navigate('/category');
    } catch (err) {
      setError('Failed to save category');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, error, isEditMode, handleChange, handleSubmit };
};

export default useEditorCategory;
