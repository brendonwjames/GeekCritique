import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../store/games";
import { NavLink } from 'react-router-dom'
import EditModal from "../Modals/EditModal";
import DeleteModal from "../Modals/DeleteModal";


const AllGames = () => {
    const dispatch = useDispatch();
    const games = useSelector((state => Object.values(state.game)))

    useEffect(() => {
        dispatch(getAllGames());
    }, [dispatch])

return (
    <>
        {games && games.map((game) => (
            <div className='game-post' key={game.id}>
                <h3>{game.name}</h3>
                <p>Posted on {game.created_at}</p>
                <p>{game.description}</p>
                <NavLink><img src={game.img_src} alt='Your image is not available. Try a new link!'></img></NavLink>
                <EditModal game={game}/>
                <DeleteModal game={game}/>
            </div>
        ))}
    </>
)

}

export default AllGames;
