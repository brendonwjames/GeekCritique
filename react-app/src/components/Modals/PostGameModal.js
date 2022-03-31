import React, { useState } from "react";
import { Modal } from "./ModalContext/Modal";
import PostGame from "../Game/PostGame";
import './PostGameModal.css';


function PostGameModal() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <i className='fa-regular fa-square-plus' onClick={() => setShowModal(true)}>
        <div className='tooltip-box'>NewGame</div>
      </i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostGame setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default PostGameModal;