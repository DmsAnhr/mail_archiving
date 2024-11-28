import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategories, getDocumentById, createDocument, updateDocument } from '../services/serviceDocument';

const useDocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);
  const [form, setForm] = useState({
    reference_number: '',
    category: '',
    title: '',
    file: '',
  });
  const [oldFile, setOldFile] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorFile, setErrorFile] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocument = async () => {
    setLoading(true);
    try {
      const response = await getDocumentById(id);
      setForm({
        reference_number: response.data[0].reference_number,
        category: response.data[0].category_id,
        title: response.data[0].title,
        file: response.data[0].file_path,
      });
      setOldFile(response.data[0].file_path)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const maxFileSize = 5 * 1024 * 1024;
      if (file.size > maxFileSize) {
        setErrorFile('Ukuran berkas melebihi batas 5 MB. Harap unggah berkas yang lebih kecil.');
        return;
      }
      setForm((prev) => ({ ...prev, file }));
      setErrorFile(null);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    const formData = new FormData();
    formData.append('reference_number', form.reference_number);
    formData.append('category_id', form.category);
    formData.append('title', form.title);
    if (form.file) {
      formData.append('file', form.file);
    }

    try {
      if (isEditMode) {
        await updateDocument(id, formData);
      } else {
        await createDocument(formData);
      }
      navigate('/');
    } catch (err) {
      if (err.status == 400) {
        setError("Nomor surat sudah ada");
      }else{
        setError(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (isEditMode) {
      fetchDocument();
    }
  }, [isEditMode]);

  return {
    form,
    categories,
    oldFile,
    loading,
    error,
    errorFile,
    isEditMode,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
};

export default useDocumentEditor;
