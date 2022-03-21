import React, { useEffect, useState } from "react";
import { Modal } from "./ModalContext/Modal";
import GameDetails from "../Game/GameDetails";
import { useDispatch } from 'react-redux';
import './GameDetailsModal.css';

function GameDetailsModal({ game }) {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(userGames(game.owner_id))
    }, [dispatch, game.id])

   const faultyImg = 'https://www.models-resource.com/resources/big_icons/2/1708.png'

    return (
        <>
            <img className="modal-img" src={game.img_src} alt="Faulty Url" onError={(e)=>{e.target.src=faultyImg}} onClick={() => setShowModal(true)} />
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <GameDetails closeModal={() => setShowModal(false) } setShowModal={setShowModal} game={game}/>
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