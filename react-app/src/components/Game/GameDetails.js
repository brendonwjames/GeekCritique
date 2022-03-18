import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import EditModal from "../Modals/EditModal";
import DeleteModal from "../Modals/DeleteModal";

const GameDetailsPage = ({ game }) => {

    return (
        <div>
            GameDetailsPage
            <img src={game.img_src} alt='Faulty URL'></img>
            <p>{game.id}</p>
            <p>{game.description}</p>
            <EditModal game={game}/>
            <DeleteModal game={game}/>
        </div>
    );
};

export default GameDetailsPage;