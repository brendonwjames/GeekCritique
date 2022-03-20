import React from "react";
import EditModal from "../Modals/EditModal";
import DeleteModal from "../Modals/DeleteModal";
import { useSelector } from "react-redux";
import GameReview from "../Review/GameReview";
import PostReview from "../Review/PostReview";
import './GameDetails.css';

const GameDetailsPage = ({ game }) => {
    const user = useSelector((state) => state.session.user);

    return (
        <div className='game-details-container'>  
            <div className='left-half'>
                    <img className='game-details-image' src={game.img_src} alt='Faulty URL'></img>
                    <div className='game-details'>
                        <p>{game.name}</p>
                        <p>{game.description}</p>
                        {user.id === game.owner_id && <EditModal game={game}/>}
                        {user.id === game.owner_id && <DeleteModal game={game}/>}
                    </div>
                    <div className='post-review'>
                        <PostReview game={game} />
                    </div>
            </div>
            <div className='right-half'>
                    <GameReview game={game} />
            </div>
        </div>
    );
};

export default GameDetailsPage;