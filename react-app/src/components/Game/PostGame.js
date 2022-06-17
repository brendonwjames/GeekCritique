import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGame, getAllGames } from '../../store/games';
import { userGames } from '../../store/usergames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PostGame.css'

const PostGame = ({ setShowModal }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [img_src, setImg] = useState('');
    // const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    // const [createdAt] = useState(null);
    const [imagePreview, setImagePreview] = useState();

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
        formData.append('createdAt', new Date().toISOString().slice(0, 10));

        const result = await dispatch(addGame(formData));

        if (result === 'Success!') {
            console.log('Success', formData)

            if (owner_id) {
                dispatch(userGames(user.id))
            }
            dispatch(getAllGames())
            setShowModal(false);
            // setImageLoading(false);
        }

        else {
            console.log('Failure, RESULT:', result)
            const data = await result;
            setErrors([data]);
            console.log('errors:', errors)
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImg(file);
    }

    const imageChange = (e) => {
        updateImage(e);
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            const file = e.target.files[0];
            setImagePreview(file);
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                setImagePreview(reader.result);
            });
        };
    };

    return (
        <div className='page container' >


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
                                required
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
                                onChange={imageChange}
                                hidden='hidden'
                            ></input>
                            <div className='postErrors'>
                                {/* {console.log(errors)} */}
                                {errors.map((error, ind) => (
                                    <div key={ind}>{error}</div>
                                ))}
                            </div>
                            <label htmlFor='chooseFileInput' className='choose-file-button'>Select an Image</label>
                        </div>
                    </div>
                    <div className='buttons-div'>
                        <button className='post-submit-button' type='submit'>Post</button>
                        <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </form>
            </div>
            {imagePreview && <img className='imagePreview' src={imagePreview} />}
        </div>
    )
}


export default PostGame;