import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGame } from '../../store/games';
import './EditGame.css'

const EditGame = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [img_src, setImg] = useState('');  
    const [errors, setErrors] = useState([]);
    const [createdAt, setCreatedAt] = useState(null);

    const owner_id = useSelector(state => state.session.user.id)
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const game = {owner_id, name, description, img_src, createdAt } 

        console.log('time to play the game', game)

        return dispatch(updateGame(game))
    }

    return (
        <div className='new-game-form-container'>
            <form className='new-game-form' onSubmit={handleSubmit}>
                <div className='postErrors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                </div>
                <p className='create-post-text'>Create New Post</p>
                <div className='choose-file-container'>
                </div>
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
                    <input
                        type='textarea'
                        name='description'
                        className='description-field'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder='Description'
                        ></input>
                </div>
                <input
                        type='text'
                        name='img_src'
                        className='img-field'
                        onChange={(e) => setImg(e.target.value)}
                        placeholder='Image URL'
                    ></input>
                <button className='post-submit-button' type='submit'>Post</button>
            </form>
        </div>
    )
}


export default EditGame;