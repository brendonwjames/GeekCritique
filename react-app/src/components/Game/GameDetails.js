import React from "react";
import EditModal from "../Modals/EditModal";
import DeleteModal from "../Modals/DeleteModal";
import { useSelector } from "react-redux";
import GameReview from "../Review/GameReview";
import PostReview from "../Review/PostReview";
import { NavLink } from 'react-router-dom';
import AddGameToShelf from "../Shelf/AddGameToShelf";
import RemoveGameFromShelf from "../Shelf/RemoveGameFromShelf";

import './GameDetails.css';

const GameDetailsPage = ({ setShowModal, game }) => {
    const user = useSelector((state) => state.session.user);
    // const review = useSelector((state) => Object.values(state.review))
    const allUsers = useSelector((state) => (state.session.allUsers))

    const defaultImg = 'https://www.models-resource.com/resources/big_icons/2/1708.png'
    // const defaultProfileImg="https://images.nintendolife.com/428c8ddbb2c32/smm2.large.jpg"

    return (
        <div className='game-details-container'> 
             
            <div className='left-half'>
                    <div className='left-half-top'>
                        {/* <div className='top-of-top'> */}
                            <img className='game-details-image' src={game.img_src} alt='Faulty URL' onError={(e)=>{e.target.src=defaultImg}}></img>
                            <p>{game.name}</p>
                            <p>{game.description}</p>
                            <div className='edit-delete'>
                                    {user.id === game.owner_id && <EditModal setShowModal={setShowModal} game={game}/>}
                                    {user.id === game.owner_id && <DeleteModal setShowModal={setShowModal} game={game}/>}
                                    <AddGameToShelf className='add-game-to-shelf-field' setShowModal={setShowModal} game={game}/>
                            </div>
                        {/* </div> */}
                        <p>Posted By: <NavLink to={`/users/${game.owner_id}`} exact={true} activeClassName='active' >
                            {allUsers[game.owner_id].username}
                        </NavLink> </p>
                        <div className='game-info'>
                        </div>
                    </div>
                    {/* <div className='game-details'> */}
                    {/* <img className='profile-picture' src={user.profile_pic ? user.profile_pic : defaultProfileImg}/> */}
                    <div className='post-review'>
                        <PostReview game={game} />
                    </div>
            </div>
            <div className='right-half'>
                    <GameReview key={game.id} game={game} />
            </div>
        </div>
    );
};

export default GameDetailsPage;