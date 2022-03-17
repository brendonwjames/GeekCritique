import React, { useState } from "react";
import { Modal } from "./ModalContext/Modal";
import EditGame from "../Game/EditGame";


function EditModal({ game  }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Game</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditGame setShowModal={setShowModal} game={game}/>
        </Modal>
      )}
    </>
  );
}

export default EditModal;