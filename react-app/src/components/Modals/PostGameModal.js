import React, { useState } from "react";
import { Modal } from "./ModalContext/Modal";
import PostGame from "../Game/PostGame";


function PostGameModal() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <i className="fa-regular fa-square-plus" onClick={() => setShowModal(true)}></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostGame setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default PostGameModal;