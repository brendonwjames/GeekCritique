import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserShelves, newShelf } from '../../store/shelves';
import { getAllGames } from '../../store/games';
import { userGames } from '../../store/usergames';
import './PostShelf.css'

const PostShelf = ({ setShowModal }) => {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    const owner_id = useSelector(state => state.session.user.id)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const shelf = { owner_id, name }

        const result = await dispatch(newShelf(shelf))

        if (result === 'Success!') {

            dispatch(getAllGames())
            dispatch(getUserShelves(user.id))
            dispatch(userGames(user.id))
            
            // setShowModal(false)
        }

        else if (result) {
            setErrors(result);
        }
    }

    return (
        <div className='new-shelf-form-container'>
            <form className='new-shelf-form' onSubmit={handleSubmit}>
                <div className='title-div'>
                    <p className='create-post-text'>Create New Shelf</p>
                </div>
                <div className='choose-file-container'>
                    <div>
                        <input
                            type='text'
                            className='name-field'
                            name='name'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder='Name'
                            ></input>
                    </div>
                </div>
                <div className='buttons-div'>
                    <button className='post-submit-button' type='submit'>Post</button>
                    <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </form>
            <div className='postErrors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                </div>
        </div>
    )
}


export default PostShelf;