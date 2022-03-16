import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGame } from '../../store/games';
import './PostGame.css'

const PostGame = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [img_src, setImg] = useState('');  
    const [errors, setErrors] = useState([]);


    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(formData, 'Frontend')

        formData.append('name', name);
        formData.append('description', description);
        formData.append('img_src', img_src);

        dispatch(addGame(formData))

        // const results = await dispatch(addGame(formData))
        // console.log('RESULTS:', results)
        // if (results === 'Success'){
        //     if(userId){
        //         dispatch(getUserPosts(userId))
        //     }
        //     setShowModal(false)
        // }else{
        //     const data = await results.json()
        //     setErrors([data.errors])
        // }

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


export default PostGame;