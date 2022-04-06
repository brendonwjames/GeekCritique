import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from 'react-router-dom';
import { getAllGames, updateGame } from "../../store/games";
import { allReviews } from "../../store/reviews";
import { getUserShelves } from "../../store/shelves";
import { userGames } from "../../store/usergames";
import GameDetailsModal from "../Modals/GameDetailsModal";
import { getUsers } from "../../store/session";
import PostShelf from "./PostShelf";
import RemoveGameFromShelf from "./RemoveGameFromShelf";
import './UserShelves.css';


const UserShelves = () => {
    const dispatch = useDispatch();
    // const { userId } = useParams();
    const user = useSelector(state => state.session.user);
    const shelves = useSelector((state => Object.values(state.shelf)))

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getAllGames());
        dispatch(userGames(user.id))
        dispatch(allReviews(user.id));
        dispatch(getUserShelves(user.id));

    }, [dispatch])

    
    console.log('SHELVES:',shelves)

return (
    <>
        Coming from usershelves component
        <div className='feed-title'>
            <h1>Shelves</h1>
        </div>
        <PostShelf />

        <div className='game-container'>
            {shelves[0] && shelves[0].map((shelf) => (
                <div className='game-post' key={shelf.id}>
                    <div>
                        {shelf.name}
                        {shelf.games && shelf.games.map((game) => 
                        <div className='game-post' key={game.id}>
                            <GameDetailsModal game={game}/>
                            <RemoveGameFromShelf className='remove-game-from-shelf-field' shelf={shelf} game={game}/>
                        </div>
                        // <div className='shelf-game-name' key={game.id}>{game.name}</div>
                    )}
                    </div>
                </div>
            ))}
        </div>
    </>
)

}

export default UserShelves;