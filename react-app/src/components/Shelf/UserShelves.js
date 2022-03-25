import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../store/games";
import { allReviews } from "../../store/reviews";
import { getUserShelves } from "../../store/shelves";
import GameDetailsModal from "../Modals/GameDetailsModal";
import { getUsers } from "../../store/session";
import './UserShelves.css';


const UserShelves = () => {
    const dispatch = useDispatch();
    // const shelves = useSelector((state => Object.values(state.shelf)))

    // console.log('SHELVES', shelves)

    // useEffect(() => {
    //     dispatch(getAllGames());
    //     dispatch(allReviews());
    //     dispatch(getUsers());
    // }, [dispatch])

return (
    <>
        Coming from usershelves component
        {/* <div className='feed-title'>
            <h1>Games</h1>
        </div>
        <div className='game-container'>
            {games && games.map((game) => (
                <div className='game-post' key={game.id}>
                    <GameDetailsModal game={game}/>
                </div>
            ))}
        </div> */}
    </>
)

}

export default UserShelves;