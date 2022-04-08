import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGameToShelf } from "../../store/shelves";
import { getUserShelves } from '../../store/shelves';
import { getAllGames } from '../../store/games';
import { userGames } from '../../store/usergames';
import './AddGameToShelf.css';

const AddGameToShelf = ({ game }) => {
    const [errors, setErrors] = useState([]);
    const [shelf, setShelf] = useState();
    
    // console.log('ERROR:', errors)
    
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const game_id = game.id;
    const shelves = useSelector((state => Object.values(state.shelf)))


    // console.log('RATING', rating)

    const reset = () => {
        setErrors([]);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const gameToShelf = { shelf, game_id }
        console.log('SHELF IN HANDLESUBMIT', shelf)
        
        const result = await dispatch(addGameToShelf(gameToShelf, shelf, game_id))

        if (result === 'Success!') {

            alert("Added to shelf!")
            dispatch(getAllGames())
            dispatch(getUserShelves(user.id))
            dispatch(userGames(user.id))
        }

        else if (result) {
            setErrors(result);
        } else {
            alert("Unable to add to shelf!")
            reset()
        }
    }

    return (
        <div className='post-game-shelf-container'>
            <form className='game-to-shelf-form' onSubmit={handleSubmit}>
                <div className='game-errors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                </div>
                <div className='game-to-shelf-top-div'>
                    <button className='review-submit-button' type='submit'>Add to Shelf</button>
                    
                    <div>
                        <div>Select Shelf</div>
                        <select value={shelf} onChange={e => setShelf(e.target.value)}>
                            <option value={null}>--Choose a Shelf--</option>
                        {shelves[0] && shelves[0].map((shelf) => (
                            <option value={shelf.id}>{shelf.name}</option>
                        ))}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddGameToShelf;