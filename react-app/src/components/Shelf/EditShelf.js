import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userGames } from '../../store/usergames';
import { getUserShelves } from '../../store/shelves';
import { updateShelf } from '../../store/shelves';
import './EditShelf.css'

const EditShelf = ({ setShowModal, shelf }) => {
    const [name, setName] = useState(shelf.name)
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)

    const handleEdit = async(e) => {
        e.preventDefault();

        const editedShelf = { name }

        const result = await dispatch(updateShelf(shelf.id, editedShelf))

        if (result === 'Success!') {
            setShowModal(false)
            dispatch(userGames(user.id))
            dispatch(getUserShelves(user.id))
        }

        else if (result) {
            setErrors(result);
        }
    }

    return (
        <div className='edit-game-form-container'>
            <form className='edit-game-form' onSubmit={handleEdit}>
                <div className='postErrors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                </div>
                <p className='edit-post-text'>Rename Shelf</p>
                <div className='choose-file-container'>
                </div>
                <div>
                    <input
                        type='text'
                        className='name-field'
                        name='name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder={shelf.name}
                        ></input>
                </div>
                <button className='post-submit-button' type='submit'>Confirm Edit</button>
                <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
            </form>
        </div>
    )
}


export default EditShelf;