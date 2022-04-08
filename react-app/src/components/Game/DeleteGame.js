import React from 'react';
import { useDispatch } from 'react-redux';
import { removeGame } from '../../store/games';
import { userGames } from '../../store/usergames';
import { getUserShelves } from '../../store/shelves';
import './DeleteGame.css'

const DeleteGame = ({ setShowModal, game }) => {

    const dispatch = useDispatch();

    const handleDelete = async () => {
        setShowModal(false)
        await dispatch(removeGame(game.id))
        await dispatch(userGames(game.owner_id))
        await dispatch((getUserShelves(game.owner_id)))
    }

    return (
        <div className='delete-game-modal-container'>
            <h3>Are you sure you want to delete {game.name}?</h3>
            <h3>It will be gone forever!</h3>
            <div className='delete-popup-container'>
                <button onClick={handleDelete} className='delete-button'>Confirm Delete</button>
                <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
             </div>
        </div>
    )
}

export default DeleteGame;