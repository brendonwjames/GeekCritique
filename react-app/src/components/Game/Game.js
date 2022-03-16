import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../store/games";


const Game = () => {
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.session.user);
    const allGames = useSelector((state => state.game.games))
    console.log('GAMES OBJ:', allGames)
    const games = Object.values(allGames)
    // console.log(games)

    useEffect(() => {
        dispatch(getAllGames());
    }, [dispatch])

return (
    <>
        {/* <div>{user.username}</div> */}
        {games.map((game) => (
            <div className='game-post' key={game.id}>
                <h3>{game.name}</h3>
                <p>Posted on {game.created_at}</p>
                <p>{game.description}</p>
                <img src={game.img_src} alt='Not loading right now'></img>
            </div>
        ))}
    </>
)

}

export default Game;
