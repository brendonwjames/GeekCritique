import React, { useState } from "react";
import { Modal } from "./ModalContext/Modal";
import DeleteGame from "../Game/DeleteGame";


function DeleteModal({ game }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete Game</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteGame setShowModal={setShowModal} game={game}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteModal;