import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../store/games";
import { allReviews } from "../../store/reviews";
import GameDetailsModal from "../Modals/GameDetailsModal";
import { getUsers } from "../../store/session";
import { getUserShelves } from "../../store/shelves";
import UserShelves from "../Shelf/UserShelves";
import './AllGames.css';


const AllGames = () => {
    const dispatch = useDispatch();
    const games = useSelector((state => Object.values(state.game)));
    const user = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(getAllGames());
        dispatch(allReviews());
        dispatch(getUsers());
        dispatch(getUserShelves(user.id));
    }, [dispatch])

return (
    <>
        <div className='feed-title'>
            <h1>Games</h1>
        </div>
        <div className='game-container'>
            {games && games.map((game) => (
                <div className='game-post' key={game.id}>
                    <GameDetailsModal game={game}/>
                </div>
            ))}
        </div>
        {/* <UserShelves /> */}
    </>
)

}

export default AllGames;