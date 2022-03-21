import React from 'react';
import { useDispatch } from 'react-redux';
import { removeGame } from '../../store/games';
import './DeleteGame.css'

const DeleteGame = ({ setShowModal, game }) => {
    // console.log('DELETE MODAL:', game)

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(removeGame(game.id))
    }

    return (
        <>
            <h3>Are you sure you want to delete your game? It will be gone forever!</h3>
            <div className='delete-popup-container'>
                <button onClick={handleDelete} className='delete-button'>Confirm Delete</button>
                <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
             </div>
        </>
    )
}


export default DeleteGame;