import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../store/games";
import { allReviews } from "../../store/reviews";
import { getUserShelves } from "../../store/shelves";
import { userGames } from "../../store/usergames";
import GameDetailsModal from "../Modals/GameDetailsModal";
import { getUsers } from "../../store/session";
import './UserShelves.css';


const UserShelves = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getAllGames());
        dispatch(userGames(user.id))
        dispatch(allReviews());
        dispatch(getUserShelves(user.id));
    }, [dispatch])

    const shelves = useSelector((state => Object.values(state.shelf)))
    console.log('SHELVES:',shelves)

return (
    <>
        Coming from usershelves component
        <div className='feed-title'>
            <h1>Shelves</h1>
        </div>
        <div className='game-container'>
            {shelves[0] && shelves[0].map((shelf) => (
                <div className='game-post' key={shelf.id}>
                    <div>
                        {shelf.name}
                        {shelf.games && shelf.games.map((game) => 
                        <div>{game.name}</div>
                    )}
                    </div>
                </div>
            ))}
        </div>
    </>
)

}

export default UserShelves;