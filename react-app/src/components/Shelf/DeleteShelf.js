import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeShelf } from '../../store/shelves';
import { getUserShelves } from '../../store/shelves';
import './DeleteShelf.css';

const DeleteShelf = ({ setShowModal, shelf }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const handleDelete = async (e) => {
        setShowModal(false)
        await dispatch(removeShelf(shelf.id))
        await dispatch(getUserShelves(user.id));
    }

    return (
        <div className='delete-shelf-modal-container'>
            <h3>Are you sure you want to delete {shelf.name}? You will lose all of your games on this shelf!</h3>
            <div className='delete-popup-container'>
                <button onClick={handleDelete} className='delete-button'>Confirm Delete</button>
                <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
             </div>
        </div>
    )
}


export default DeleteShelf;