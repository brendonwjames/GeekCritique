import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneGame } from '../../store/games'

const GameDetailsPage = () => {
    const dispatch = useDispatch();
    const { gameId } = useParams();

    // dispatch(getOneGame(gameId))

    const games = useSelector((state => state.game[gameId]))
    useEffect(() => {
        dispatch(getOneGame(gameId));
    }, [dispatch, gameId]);

    console.log('USE PARAMS:', gameId)

    // const user = useSelector(state => state.session.user);
    console.log('GAMES from GAME DETAILS', games)
    // const game = games[0];

    return (
        <div>
            GameDetailsPage
            <img src={games.img_src}></img>
            {/* <p>{games[0].id}</p>
            <img src={games[0].img_src}></img>
            <p>{games[0].id}</p> */}
        </div>
    );
};

export default GameDetailsPage;