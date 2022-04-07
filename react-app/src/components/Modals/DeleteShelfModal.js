import React, { useState } from "react";
import { Modal } from "./ModalContext/Modal";
import DeleteShelf from "../Shelf/DeleteShelf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function DeleteShelfModal({ shelf }) {
  const [showModal, setShowModal] = useState(false);
  // const dispatch = useDispatch();
  
  return (
    <>
      <button className='delete-modal-trashcan' onClick={() => setShowModal(true)}><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteShelf setShowModal={setShowModal} shelf={shelf}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteShelfModal;