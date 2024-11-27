import { useState, useEffect } from 'react';
import { fetchDocuments, deleteDocument, getFile } from '../services/serviceHome';

const useHome = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = { page, limit, search };
      const { data, total_pages, total_data } = await fetchDocuments(params);
      setDocuments(data);
      setTotalPages(total_pages);
      setTotalData(total_data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSearch = () => {
    fetchData();
  }

  const handleDownload = async (title, id) => {
    try {
        const response = await getFile(id);
  
        const blob = new Blob([response], { type: 'application/pdf' });
        const downloadUrl = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = title || 'document.pdf';
        link.click();
  
        URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('Error downloading file:', error);
        alert('Gagal mengunduh file');
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(id);
        fetchData(); // Refresh data after deletion
      } catch (err) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  return {
    documents,
    loading,
    error,
    search,
    setSearch,
    handleSubmitSearch,
    handleDownload,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    totalData,
    handleDelete,
  };
};

export default useHome;
