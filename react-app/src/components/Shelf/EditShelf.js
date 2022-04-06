import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userGames } from '../../store/usergames';
import { getUserShelves } from '../../store/shelves';
import { updateShelf } from '../../store/shelves';
import { getAllGames } from '../../store/games';
import { allReviews } from '../../store/reviews';
import { getUsers } from '../../store/session';
import './EditShelf.css'

const EditShelf = ({ setShowModal, shelf }) => {
    const [name, setName] = useState(shelf.name)
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    // const shelf_Id = shelf.id;
    // const user_Id = user.id;

    // useEffect(() => {
    //     dispatch(getAllGames());
    //     dispatch(allReviews());
    //     dispatch(getUsers());
    //     dispatch(getUserShelves(user.id));
    // }, [dispatch])


    const handleEdit = async(e) => {
        e.preventDefault();

        const editedShelf = { name }

        const result = await dispatch(updateShelf(shelf.id, editedShelf))

        if (result === 'Success!') {
            setShowModal(false)
            dispatch(getUserShelves(user.id))
            dispatch(userGames(user.id))
        }

        else if (result) {
            setErrors(result);
        }
    }

    return (
        <div className='new-game-form-container'>
            <form className='new-game-form' onSubmit={handleEdit}>
                <div className='postErrors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                </div>
                <p className='create-post-text'>Edit Shelf</p>
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