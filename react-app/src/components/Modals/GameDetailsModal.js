import React, { useState } from "react";
import { Modal } from "./ModalContext/Modal";
import GameDetails from "../Game/GameDetails";
import './GameDetailsModal.css';

function GameDetailsModal({ game }) {
    const [showModal, setShowModal] = useState(false);

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