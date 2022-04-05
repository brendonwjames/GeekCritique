import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGameToShelf } from "../../store/shelves";
import { getUserShelves } from '../../store/shelves';
import { getAllGames } from '../../store/games';
import { userGames } from '../../store/usergames';
import './AddGameToShelf.css';

const AddGameToShelf = ({ game }) => {
    const [shelf, setShelf] = useState();
    const [errors, setErrors] = useState([]);

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

            dispatch(getAllGames())
            dispatch(getUserShelves(user.id))
            dispatch(userGames(user.id))
        }

        else if (result) {
            setErrors(result);
        } else {
            reset()
        }
    }

    return (
        <div className='post-review-container'>
            <form className='new-review-form' onSubmit={handleSubmit}>
                <div className='review-errors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                </div>
                <div className='review-top-div'>
                    {/* <p className='create-review-text'>Add New Review</p> */}
                    <button className='review-submit-button' type='submit'>Add to Shelf</button>
                    <div>
                        <div>Select Shelf</div>
                        <select value={shelf} onChange={e => setShelf(e.target.value)}>
                            <option value={-1}>--Choose a Shelf--</option>
                        {shelves[0] && shelves[0].map((shelf) => (
                            <option value={shelf.id}>{shelf.name}</option>
                            // console.log(shelf.id)
                        ))}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddGameToShelf;