import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeGame } from '../../store/games';
import './DeleteGame.css'

const DeleteGame = ({ game }) => {
    console.log('DELETE MODAL:', game)

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(removeGame(game.id))
    }

    const handleCancel = () => {

    }

    return (
        <>
            <h3>Are you sure you want to delete your game? It will be gone forever!</h3>
            <div className='delete-popup-container'>
                <button onClick={handleDelete} className='delete-button'>Confirm Delete</button>
                <button onClick={handleCancel} className='cancel-button'>Cancel</button>
             </div>

        </>
    )
}


export default DeleteGame;