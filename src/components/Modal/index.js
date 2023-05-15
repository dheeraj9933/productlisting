import React, { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import './style.scss';

export default function ({ children, customClose }) {
  const modalContent = useRef();
  const handleClose = e => {
    if (!modalContent.current.contains(e.target)) {
      customClose();
    }
  };
  return (
    <div className='modal' onClick={handleClose}>
      <div className='modal-content' ref={modalContent}>
        {children}
        <span className='close-modal' onClick={customClose} title='Close Modal'>
          <AiOutlineClose />
        </span>
      </div>
    </div>
  );
}
