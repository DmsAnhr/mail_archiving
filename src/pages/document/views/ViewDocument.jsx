import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useViewDocument from '../hooks/useViewDocument';
import { Alert, Spinner, Button } from 'react-bootstrap';
import { MEDIA_URL, formatDateTime } from '../../../utils/Constant';

const ViewDocument = () => {
  const { id } = useParams();
  const { data, loading, error, handleDownload } = useViewDocument(id);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className='min-h-100'>
        <div style={{height:"79px"}} className='position-relative d-flex align-items-center'>
            <Link to={`/`} className='position-absolute text-decoration-none' style={{top:"-10px"}}><i className="bi bi-chevron-double-left me-1"></i>Kembali</Link>
            <h1 className='m-0'>Arsip Surat &gt;&gt; Detail</h1>
        </div>
        <div className='py-3 w-100 d-flex justify-content-between align-items-start'>
            <table>
                <tbody>
                    <tr>
                        <td>Nomor Surat</td>
                        <td className='px-3'>:</td>
                        <td className='fw-500'>{data.reference_number}</td>
                    </tr>
                    <tr>
                        <td>Judul</td>
                        <td className='px-3'>:</td>
                        <td className='fw-500'>{data.title}</td>
                    </tr>
                    <tr>
                        <td>Kategori</td>
                        <td className='px-3'>:</td>
                        <td className='fw-500'>{data.category_name}</td>
                    </tr>
                    <tr>
                        <td>Waktu Unggah</td>
                        <td className='px-3'>:</td>
                        <td className='fw-500'>{formatDateTime(data.created_at)}</td>
                    </tr>
                </tbody>
            </table>
            <Link to={`/document/update/${id}`} className="btn btn-sm btn-yellow"><i className="bi bi-pencil-square me-2"></i>Edit / Ganti file</Link>
        </div>
        <hr />
        <div className="my-4 w-100 d-flex justify-content-between align-items-center">
            <h3 className='m-0'>Preview Surat</h3>
            <Button variant="green me-3" size='sm' onClick={handleDownload}>
                <i className="bi bi-download me-2"></i>Unduh Surat
            </Button>
        </div>
        <div className="pdf-viewer overflow-hidden" style={{ height: '600px'}}>
            <iframe
              src={`${MEDIA_URL}${data.file_path}`}
              title="PDF Viewer"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
        </div>
        <div className="d-flex mt-4 mb-5">
            <Link to={`/`} className="btn btn-secondary me-3"><i className="bi bi-chevron-double-left me-2"></i>Kembali</Link>
            <Button variant="success me-3" onClick={handleDownload}>
                <i className="bi bi-download me-2"></i>Unduh Surat
            </Button>
            <Link to={`/document/update/${id}`} className="btn btn-warning"><i className="bi bi-pencil-square me-2"></i>Edit / Ganti file</Link>
        </div>
    </div>
  );
};

export default ViewDocument;
