import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../store/games";
import EditModal from "../Modals/EditModal";
import DeleteModal from "../Modals/DeleteModal";


const AllGames = () => {
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.session.user);
    const games = useSelector((state => Object.values(state.game)))
    // console.log('GAMES OBJ:', allGames)
    // console.log(games)

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
                <img src={game.img_src} alt='Your image is not available. Try a new link!'></img>
                <EditModal game={game}/>
                <DeleteModal game={game}/>
            </div>
        ))}
    </>
)

}

export default AllGames;
