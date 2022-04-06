import React, { useState } from "react";
import { Modal } from "./ModalContext/Modal";
import EditShelf from "../Shelf/EditShelf";

import './EditShelfModal.css';


function EditShelfModal({ shelf  }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button className='edit-button' onClick={() => setShowModal(true)}>Edit Shelf</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditShelf setShowModal={setShowModal} shelf={shelf} />
        </Modal>
      )}
    </>
  );
}

export default EditShelfModal;