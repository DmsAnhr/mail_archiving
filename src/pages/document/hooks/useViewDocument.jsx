import { useState, useEffect } from 'react';
import { getDocumentById, getFile } from '../services/serviceDocument';

const useViewDocument = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    try {
        const response = await getFile(id);
  
        const blob = new Blob([response], { type: 'application/pdf' });
        const downloadUrl = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = data.title || 'document.pdf';
        link.click();
  
        URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('Error downloading file:', error);
        alert('Gagal mengunduh file');
    }
  }

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem('token');
        const file =  await getFile(1);
        const response = await getDocumentById(id, token);
        setData(response.data[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  return { data, loading, error, handleDownload };
};

export default useViewDocument;
