import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useDocumentEditor from '../hooks/useDocumentEditor';
import { MEDIA_URL } from '../../../utils/Constant';

const DocumentEditor = () => {
  const { id } = useParams();
  const {
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
  } = useDocumentEditor();

  return (
    <div className="min-h-100">
      <div style={{height:"79px"}} className='d-flex align-items-center'>
        <h1 className='m-0'>Arsip Surat &gt;&gt; {isEditMode ? 'Edit' : 'Unggah'} Surat</h1>
      </div>
      <p className='text-secondary mb-5'>
        Unggah surat yang telah terbit pada form ini untuk diarsipkan. <br />
        Catatan : <br />
        <span className='ms-4'>&#8226; Gunakan file berformat PDF</span> <br />
        <span className='ms-4'>&#8226; Ukuran file maksimal 5mb</span>
      </p>

      {/* <h1>{isEditMode ? 'Edit Document' : 'Create Document'}</h1> */}

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="row mb-3">
          <label htmlFor="reference_number" className="col-form-label col-12 col-sm-2">
            Nomor Surat
          </label>
          <div className="col-12 col-sm-4">
            <input
              type="text"
              id="reference_number"
              name="reference_number"
              className="form-control shadow-none"
              value={form.reference_number}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="category" className="col-form-label col-12 col-sm-2">
            Kategori
          </label>
          <div className="col-12 col-sm-4">
            <select
              id="category"
              name="category"
              className="form-select shadow-none"
              value={form.category || ''}
              onChange={handleChange}
              required
            >
              <option disabled hidden value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="title" className="col-form-label col-12 col-sm-2">
            Judul
          </label>
          <div className="col-12 col-sm-8">
            <input
              type="text"
              id="title"
              name="title"
              className="form-control shadow-none"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="file" className="col-form-label col-12 col-sm-2">
            File Surat (PDF)
          </label>
          <div className="col-12 col-sm-6">
            <input
              type="file"
              id="file"
              name="file"
              accept="application/pdf"
              className="form-control shadow-none"
              onChange={handleFileChange}
            />
              {isEditMode ?(
                <div className='mt-1 d-flex'>
                  <span className='fs-14p'>
                    File saat ini : {oldFile.split('/').pop()}
                  </span>
                  <a 
                    href={`${MEDIA_URL}${oldFile}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ms-2 fs-14p"
                  >
                    Lihat
                  </a>
                </div>
              ):(
                <small className={errorFile && 'text-danger'}>
                  {errorFile ? ({errorFile}) : ("Ukuran maksimal file 5MB")}
                </small>
              )}
          </div>
        </div>


        <Link to={isEditMode ? `/document/detail/${id}` : '/document'} className='btn btn-grey me-2 mt-3'>
          <i className="bi bi-chevron-double-left me-1"></i>Kembali
        </Link>
        <Button variant="primary mt-3" onClick={handleSubmit} disabled={loading}>
            <i className="bi bi-floppy2-fill me-2"></i>
            {isEditMode ? 'Simpan Perubahan' : 'Simpan'}
        </Button>
      </form>
    </div>
  );
};

export default DocumentEditor;
