import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addGame, getAllGames } from '../../store/games';
import { userGames } from '../../store/usergames';
import './PostGame.css'

const PostGame = ({ setShowModal }) => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [img_src, setImg] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [createdAt] = useState(null);

    const owner_id = useSelector(state => state.session.user.id)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const game = { owner_id, name, description, img_src, createdAt }

        const formData = new FormData();

        formData.append('owner_id', owner_id);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('img_src', img_src);

        const result = await dispatch(addGame(formData));

        if (result === 'Success!') {
            console.log('Success', formData)

            if (owner_id) {
                dispatch(userGames(user.id))
            }
            dispatch(getAllGames())
            setShowModal(false);
            setImageLoading(false);
        }

        else {
            console.log('Failure', formData)
            const data = await result.json();
            setErrors([data.errors]);
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImg(file);
    }

    return (
        <div className='new-game-form-container'>
            <form className='new-game-form' onSubmit={handleSubmit}>
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
                            type='file'
                            id='chooseFileInput'
                            accept='image/*'
                            name='img_src'
                            onChange={updateImage}
                            // hidden='hidden'
                        ></input>
                        {/* <label htmlFor='chooseFileInput' className='choose-file-button'/> */}
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


export default PostGame;