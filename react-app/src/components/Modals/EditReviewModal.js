import React, { useState } from "react";
import { Modal } from "./ModalContext/Modal";
import EditReview from "../Review/EditReview";


function EditReviewModal({ game, review }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReview setShowModal={setShowModal} game={game} review={review} />
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;