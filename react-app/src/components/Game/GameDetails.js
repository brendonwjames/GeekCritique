import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneGame } from '../../store/games'

const GameDetailsPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const user = useSelector(state => state.session.user);
    const games = useSelector((state => Object.values(state.game)))


    useEffect(() => {
        dispatch(getOneGame(id));
    }, [dispatch, id]);


    return (
        <main>
            GameDetailsPage
            <p>{games.id}</p>
        </main>
    );
};

export default GameDetailsPage;