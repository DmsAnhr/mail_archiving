import React, { useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';

const useConfirmation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [resolver, setResolver] = useState(null);

  const confirm = (message) => {
    setMessage(message);
    setIsVisible(true);
    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleClose = (result) => {
    setIsVisible(false);
    if (resolver) resolver(result);
  };

  const ConfirmationDialog = () => (
    <ConfirmationModal show={isVisible} onClose={handleClose} message={message} />
  );

  return { confirm, ConfirmationDialog };
};

export default useConfirmation;
