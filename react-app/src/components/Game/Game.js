import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../store/games";


const Game = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getAllGames());
    }, [dispatch])
    
return (
    <div>{user.username}</div>
)

}

export default Game;
