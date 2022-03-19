import React from "react";
import EditModal from "../Modals/EditModal";
import DeleteModal from "../Modals/DeleteModal";
import './GameDetails.css';

const GameDetailsPage = ({ game }) => {

    return (
        <div className='game-details-container'>
            <img className='game-details-image' src={game.img_src} alt='Faulty URL'></img>
            <p>{game.name}</p>
            <p>{game.description}</p>
            <EditModal game={game}/>
            <DeleteModal game={game}/>
        </div>
    );
};

export default GameDetailsPage;