import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useEditorCategory from '../hooks/useEditorCategory';
import { Row, Col, Form, Button } from 'react-bootstrap';

const EditorCategory = () => {
  const { 
    form, 
    loading, 
    error, 
    isEditMode, 
    handleChange, 
    handleSubmit 
  } = useEditorCategory();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='min-h-100'>
      <div style={{height:"79px"}} className='d-flex align-items-center'>
          <h1 className='m-0'>Arsip Surat &gt;&gt; {isEditMode ? 'Edit' : 'Tambah'}</h1>
      </div>
      <p className='text-secondary mb-5'>
        Tambahkan atau edit kategori. <br />
        Jika sudah selesai, jangan lupa klik simpan.
      </p>

      <Form>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Nama Kategori</Form.Label>
            <Col sm={10}>
                <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className='shadow-none'
                />
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Judul</Form.Label>
            <Col sm={10}>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className='shadow-none'
                />
            </Col>
        </Form.Group>
        <Link to='/category' className='btn btn-grey me-2 mt-3'>
          <i className="bi bi-chevron-double-left me-1"></i>Kembali
        </Link>
        <Button variant="primary mt-3" onClick={handleSubmit}>
            <i className="bi bi-floppy2-fill me-2"></i>
            {isEditMode ? 'Simpan Perubahan' : 'Simpan'}
        </Button>
      </Form>
    </div>
  );
};

export default EditorCategory;
