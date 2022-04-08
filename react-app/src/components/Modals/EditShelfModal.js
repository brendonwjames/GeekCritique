import React, { useState } from "react";
import { Modal } from "./ModalContext/Modal";
import EditShelf from "../Shelf/EditShelf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './EditShelfModal.css';


function EditShelfModal({ shelf  }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button className='edit-shelf-button' onClick={() => setShowModal(true)}><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditShelf setShowModal={setShowModal} shelf={shelf} />
        </Modal>
      )}
    </>
  );
}

export default EditShelfModal;