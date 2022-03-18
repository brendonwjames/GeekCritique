import React, { useEffect, useState } from "react";
import { Modal } from "./ModalContext/Modal";
import GameDetails from "../Game/GameDetails";
import { useDispatch } from 'react-redux';




function GameDetailsModal({ game }) {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()
    useEffect(() => {
        
    }, [dispatch, game.id])

    return (
        <>
            <img className="modal-img" src={game.img_src} alt="Faulty Url" onClick={() => setShowModal(true)} />
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <GameDetails closeModal={() => setShowModal(false) } game={game}/>
            </Modal>
            )}
        </>
    );
}

export default GameDetailsModal;


// function EditModal({ game  }) {
//   const [showModal, setShowModal] = useState(false);
  
//   return (
//     <>
//       <button onClick={() => setShowModal(true)}>Edit Game</button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <EditGame setShowModal={setShowModal} game={game}/>
//         </Modal>
//       )}
//     </>
//   );
// }

// export default EditModal;