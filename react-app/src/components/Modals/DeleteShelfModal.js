import React, { useState } from "react";
import { Modal } from "./ModalContext/Modal";
import DeleteShelf from "../Shelf/DeleteShelf";


function DeleteShelfModal({ shelf }) {
  const [showModal, setShowModal] = useState(false);
  // const dispatch = useDispatch();
  
  return (
    <>
      <button className='delete-modal' onClick={() => setShowModal(true)}>Delete Shelf</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteShelf setShowModal={setShowModal} shelf={shelf}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteShelfModal;