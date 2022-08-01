import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../store/games";
import { allReviews } from "../../store/reviews";
import { getUserShelves } from "../../store/shelves";
import { userGames } from "../../store/usergames";
import GameDetailsModal from "../Modals/GameDetailsModal";
import { getUsers } from "../../store/session";
import PostShelf from "./PostShelf";
import DeleteShelfModal from "../Modals/DeleteShelfModal";
import EditShelfModal from "../Modals/EditShelfModal";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RemoveGameFromShelf from "./RemoveGameFromShelf";
import './UserShelves.css';

const UserShelves = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const shelves = useSelector((state => Object.values(state.shelf)))

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getAllGames());
        dispatch(userGames(user.id))
        dispatch(allReviews(user.id));
        dispatch(getUserShelves(user.id));
    }, [dispatch, user.id])

    
    console.log('SHELVES:',shelves)

return (
    <div>
        <div className='feed-title'> 
            <h1>Shelves</h1>
        </div>
        <div className='shelf-page-container'>
            <PostShelf />
            <div className='shelf-container'>
                {shelves && shelves.map((shelf) => (
                    <div className='games-post' key={shelf.id}>
                        <div className='shelf-details-left'>
                            {shelf.name}
                        </div>
                        <div className='shelf-inner-container'>
                            <div className='shelf-container'>
                                
                            </div>
                            {shelf.games && shelf.games.map((game) => 
                            <div className='games-post' key={game.id}>
                                <GameDetailsModal game={game}/>
                                <RemoveGameFromShelf className='remove-game-from-shelf-field' shelf={shelf} game={game}/> 
                            </div>
                        )}
                        </div>
                        <EditShelfModal className='edit-shelf-name' shelf={shelf} />
                        <DeleteShelfModal className='remove-game-from-shelf-field' shelf={shelf} />
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}

export default UserShelves;