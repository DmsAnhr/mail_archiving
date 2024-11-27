import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import useCategory from '../hooks/useCategory';
import useConfirmation from '../../../utils/useConfirmation';

const Category = () => {
  const { categories, loading, error, search, setSearch, handleSubmitSearch, handleDeleteCategory } = useCategory();
  
  const { confirm, ConfirmationDialog } = useConfirmation();

  const deleteValidation = async (id) => {

    const isConfirmed = await confirm('Apakah Anda yakin ingin menghapus kategori ini?');
    if (isConfirmed) {
      handleDeleteCategory(id);
    }

  };

  return (
    <div className="min-h-100">
      <div style={{height:"79px"}} className='d-flex align-items-center'>
        <h1 className='m-0'>Kategori Surat</h1>
      </div>
      <p className='text-secondary mb-5'>
        Berikut ini adalah kategori yang bisa digunakan untuk melabeli surat. <br />
        Klik "Tambah" untuk menambahkan kategori baru.
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
        <Link to={`/category/create`} type='button' className='btn btn-primary'><i className="bi bi-plus-lg me-2"></i>Tambah Kategori</Link>
      </div>

      

      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <table className="mb-0 table table-bordered table-hover custom-table">
          <thead>
            <tr>
              <th className='text-center'>#</th>
              <th>Nama Ketegori</th>
              <th>Keterangan</th>
              <th className='text-center'>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  Loading...
                </td>
              </tr>
            ):(
              categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category.id}>
                    <td className='text-center'>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td className='text-center'>
                      <Link
                        className='me-2 btn btn-sm btn-yellow'
                        to={`/category/detail/${category.id}`}
                      >
                        <i className="bi bi-pencil-square me-2"></i>
                        Edit
                      </Link>{' '}
                      <Button
                        variant="red"
                        size='sm'
                        onClick={() => deleteValidation(category.id)}
                      >
                        <i className="bi bi-trash me-1"></i>
                        Hapus
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
      )}

      <ConfirmationDialog/>
    </div>
  );
};

export default Category;
