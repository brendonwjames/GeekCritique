import React, { useState } from "react";
import { Modal } from "./ModalContext/Modal";
import PostGame from "../Game/PostGame";


function PostGameModal() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>Add New Game</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostGame setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default PostGameModal;