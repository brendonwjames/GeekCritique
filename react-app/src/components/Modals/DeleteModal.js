import React, { useState } from "react";
import { Modal } from "./ModalContext/Modal";
import DeleteGame from "../Game/DeleteGame";
import './DeleteModal.css';


function DeleteModal({ game }) {
  const [showModal, setShowModal] = useState(false);
  // const dispatch = useDispatch();
  
  return (
    <>
      <button className='delete-modal' onClick={() => setShowModal(true)}>Delete Game</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteGame setShowModal={setShowModal} game={game}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteModal;