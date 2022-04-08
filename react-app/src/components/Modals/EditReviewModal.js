import React, { useState } from "react";
import { Modal } from "./ModalContext/Modal";
import EditReview from "../Review/EditReview";
import './EditReviewModal.css';


function EditReviewModal({ game, review }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className='edit-review-button-container'>
      <button className='edit-review-button' onClick={() => setShowModal(true)}>Edit Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReview setShowModal={setShowModal} game={game} review={review} />
        </Modal>
      )}
    </div>
  );
}

export default EditReviewModal;