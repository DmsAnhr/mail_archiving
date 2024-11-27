import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import useHome from '../hooks/useHome';
import { formatDateTime } from '../../../utils/Constant';
import useConfirmation from '../../../utils/useConfirmation';
import TablePaginate from '../../../components/TablePaginate';

const Home = () => {
  const {
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
  } = useHome();
  
  const { confirm, ConfirmationDialog } = useConfirmation();

  const deleteValidation = async (id) => {

    const isConfirmed = await confirm('Apakah Anda yakin ingin menghapus arsip surat ini?');
    if (isConfirmed) {
      handleDelete(id);
    }

  };

  return (
    <div className="min-h-100">
      <div style={{height:"79px"}} className='d-flex align-items-center'>
        <h1 className='m-0'>Arsip Surat</h1>
      </div>
      <p className='text-secondary mb-5'>
        Berikut ini adalah surat- surat yang telah terbit dan diarsipkan. <br />
        Klik "Lihat" pada kolom aksi untuk menampilkan surat.
      </p>


      <div className="mb-3 d-flex w-100 justify-content-between align-items-strech">
        <Form className="w-50 d-flex align-items-strech" onSubmit={(e) => { e.preventDefault(); handleSubmitSearch(); }}>
          <input
            type="text"
            className="form-control fs-14p shadow-none border-right-0"
            placeholder="Cari judul atau nomor surat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type='submit' variant='light' className='border border-left-0'>Cari</Button>
        </Form>
        <Link to={`/document/upload`} type='button' className='btn btn-primary'><i className="bi bi-plus-lg me-2"></i>Arsipkan Surat</Link>
      </div>

      

      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <>
          <table className="mb-0 table table-bordered table-hover custom-table">
            <thead>
              <tr>
                <th>Nomor Surat</th>
                <th>Ketegori</th>
                <th>Judul</th>
                <th>Tanggal Arsip</th>
                <th className='text-center'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ?(
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    Loading...
                  </td>
                </tr>
              ):(
                documents.length > 0 ? (
                  documents.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.reference_number}</td>
                      <td>{doc.category_name}</td>
                      <td>{doc.title}</td>
                      <td>{formatDateTime(doc.created_at)}</td>
                      <td className='text-center'>
                        <Link
                          to={`/document/detail/${doc.id}`}
                          className="btn btn-grey btn-sm"
                        >
                          <i className="bi bi-eye me-1"></i> Lihat
                        </Link>
                        <Button variant="green mx-2" size='sm' 
                          onClick={() => {handleDownload(doc.title, doc.id)}}
                        >
                          <i className="bi bi-download me-1"></i>Unduh
                        </Button>
                        <Button
                          variant="red" size='sm'
                          onClick={() => deleteValidation(doc.id)}
                        >
                          <i className="bi bi-trash"></i> Hapus
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      Tidak ada Data
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="p-3 d-flex justify-content-between align-items-center border border-top-0">
            <div>
              <select
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="form-select d-inline-block w-auto me-2 shadow-none"
              >
                {[5, 10, 20, 50].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <label> dari {totalData}</label>
            </div>
            
            <TablePaginate
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
            />

            <div className='d-flex'>
              <button
                className="me-2 btn border d-flex align-items-center justify-content-center"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <i className="bi bi-chevron-left me-2" style={{fontSize:"12px"}}></i>
                Sebelumnya
              </button>
              <button
                className="btn border d-flex align-items-center justify-content-center"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
              >
                Selanjutnya 
                <i className="bi bi-chevron-right ms-2" style={{fontSize:"12px"}}></i>
              </button>
            </div>
          </div>
        </>
      )}
      <ConfirmationDialog />
    </div>
  );
};

export default Home;
