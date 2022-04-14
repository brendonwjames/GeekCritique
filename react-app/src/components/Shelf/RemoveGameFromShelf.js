import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeGameFromShelf } from '../../store/shelves';
import { getUserShelves } from '../../store/shelves';
import './RemoveGameFromShelf.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RemoveGameFromShelf = ({ shelf, game }) => {
    // console.log('DELETE MODAL:', game)
    const game_id = game.id;
    // const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const handleDelete = async(e) => {
        e.preventDefault();
        const gameToShelf = { shelf, game_id }

        await dispatch(removeGameFromShelf( gameToShelf, shelf.id, game.id ))

        dispatch(getUserShelves(user.id))
    }

    return (
        <div className='delete-from-shelf-container'>
            <div className='delete-from-shelf-button'>
                <button onClick={handleDelete} className='delete-game-from-shelf-button'><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
            </div>
        </div>
    )
}

export default RemoveGameFromShelf;