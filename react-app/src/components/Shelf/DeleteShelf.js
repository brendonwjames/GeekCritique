import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeShelf } from '../../store/shelves';
import { getUserShelves } from '../../store/shelves';

const DeleteShelf = ({ shelf }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(removeShelf(shelf.id))
        await dispatch(getUserShelves(user.id));
    }

    return (
        <>
            <div className='delete-review-button'>
                <button onClick={handleDelete} className='delete-button'>Delete Shelf</button>
                {/* <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button> */}
             </div>

        </>
    )
}


export default DeleteShelf;