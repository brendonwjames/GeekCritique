import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeGameFromShelf } from '../../store/shelves';
import { getAllGames } from '../../store/games';
import { getUserShelves } from '../../store/shelves';
import { userGames } from '../../store/usergames';
import './RemoveGameFromShelf.css';

const RemoveGameFromShelf = ({ shelf, game }) => {
    // console.log('DELETE MODAL:', game)
    const game_id = game.id;
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const handleDelete = async(e) => {
        e.preventDefault();
        const gameToShelf = { shelf, game_id }

        await dispatch(removeGameFromShelf( gameToShelf, shelf.id, game.id ))

        dispatch(getUserShelves(user.id))
    }

    return (
        <>
            <div className='delete-from-shelf-button'>
                <button onClick={handleDelete} className='delete-button'>Delete From Shelf</button>
            </div>
        </>
    )
}


export default RemoveGameFromShelf;