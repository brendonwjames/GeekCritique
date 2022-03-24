import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGame, getAllGames } from '../../store/games';
import { userGames } from '../../store/usergames';
import './PostGame.css'

const PostGame = ({ setShowModal }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [img_src, setImg] = useState('');  
    const [errors, setErrors] = useState([]);
    const [createdAt, setCreatedAt] = useState(null);

    const owner_id = useSelector(state => state.session.user.id)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const game = {owner_id, name, description, img_src, createdAt }

        const result = await dispatch(addGame(game))

        if (result === 'Success!') {

            dispatch(getAllGames())
            dispatch(userGames(user.id))
            
            setShowModal(false)
        }

        else if (result) {
            setErrors(result);
        }
    }

    return (
        <div className='new-game-form-container'>
            <form className='new-game-form' onSubmit={handleSubmit}>
                <div className='postErrors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                </div>
                <div className='title-div'>
                    <p className='create-post-text'>Create New Post</p>
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
                    <div>
                        <textarea
                            type='textarea'
                            name='description'
                            className='description-field'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            placeholder='Description'
                            ></textarea>
                    </div>
                    <div>
                        <input
                        type='text'
                        name='img_src'
                        className='img-field'
                        onChange={(e) => setImg(e.target.value)}
                        placeholder='Image URL'
                    ></input>
                    </div>
                </div>
                <div className='buttons-div'>
                    <button className='post-submit-button' type='submit'>Post</button>
                    <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}


export default PostGame;