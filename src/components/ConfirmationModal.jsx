import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({ show, onClose, message }) => {
  const handleYes = () => {
    onClose(true); // Mengirim nilai true
  };

  const handleNo = () => {
    onClose(false); // Mengirim nilai false
  };

  return (
    <Modal show={show} onHide={handleNo} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Konfirmasi</Modal.Title>
      </Modal.Header>
      <Modal.Body className='py-5'>
        <p className='m-0 text-center'>{message}</p>
      </Modal.Body>
      <Modal.Footer className='p-0 justify-content-between overflow-hidden'>
        <Button variant="secondary w-50 m-0 rounded-0" size='lg' onClick={handleNo}>
          Tidak
        </Button>
        <Button variant="red w-50 m-0 rounded-0" size='lg' onClick={handleYes}>
          Ya
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
