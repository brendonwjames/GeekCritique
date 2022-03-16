// import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../store/games";


const Game = () => {
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.session.user);
    const allGames = useSelector((state => state.game.games))
    console.log('GAMES OBJ:', allGames)
    const games = Object.values(allGames)
    console.log(games)

    useEffect(() => {
        dispatch(getAllGames());
    }, [dispatch])

return (
    <>
        {/* <div>{user.username}</div> */}
        {games.map((game) => (
            <div className='game-div' key={game.id}>
                {console.log(game)}
                {game.created_at}
                {game.description}
                {game.id}
                {game.img_src}
            </div>
        ))}
    </>
)

}

export default Game;
