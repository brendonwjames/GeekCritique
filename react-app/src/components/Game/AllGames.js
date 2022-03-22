import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../store/games";
import { allReviews } from "../../store/reviews";
import GameDetailsModal from "../Modals/GameDetailsModal";
import './AllGames.css';


const AllGames = () => {
    const dispatch = useDispatch();
    const games = useSelector((state => Object.values(state.game)))
    // console.log('I think I know whats wrong',games)

    useEffect(() => {
        dispatch(getAllGames());
        dispatch(allReviews());
    }, [dispatch])

return (
    <>
        <div className='game-container'>
        <h1>Games</h1>
            {games && games.map((game) => (
                <div className='game-post' key={game.id}>
                    <GameDetailsModal game={game}/>
                </div>
            ))}
        </div>
    </>
)

}

export default AllGames;