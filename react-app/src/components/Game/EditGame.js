import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGame } from '../../store/games';
import './EditGame.css'

const EditGame = ({ game }) => {
    const [name, setName] = useState(game.name)
    const [description, setDescription] = useState(game.description)
    const [img_src, setImg] = useState(game.img_src)
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    // console.log('GAME DETAILS:', game)

    const handleEdit = async(e) => {
        e.preventDefault();

        const editedGame = {name, description, img_src}

        const result = await dispatch(updateGame(game.id, editedGame))

        if (!editedGame) {
            setErrors(result);
            console.log('ERROR HERE', errors)
        }
    }

    return (
        <div className='new-game-form-container'>
            <form className='new-game-form' onSubmit={handleEdit}>
                <div className='postErrors'>
                    {errors?.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                </div>
                <p className='create-post-text'>Edit Game</p>
                <div className='choose-file-container'>
                </div>
                <div>
                    <input
                        type='text'
                        className='name-field'
                        name='name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder={game.name}
                        ></input>
                </div>
                <div>
                    <input
                        type='textarea'
                        name='description'
                        className='description-field'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder={game.description}
                        ></input>
                </div>
                <input
                        type='text'
                        name='img_src'
                        className='img-field'
                        onChange={(e) => setImg(e.target.value)}
                        placeholder={game.img_src}
                    ></input>
                <button className='post-submit-button' type='submit'>Confirm Edit</button>
            </form>
        </div>
    )
}


export default EditGame;