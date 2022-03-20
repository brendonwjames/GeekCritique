import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../store/reviews";
import './GameReview.css';

const PostReview = ({ game }) => {
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(3);
    const [errors, setErrors] = useState([]);

    // console.log('ERROR:', errors)

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const user_id = user.id;
    const game_id = game.id;

    // console.log('RATING', rating)

    const handleSubmit = async(e) => {
        e.preventDefault();
        const review = {user_id, game_id, content, rating, }

        const result = await dispatch(addReview(review))

        if (result) {
            setErrors(result);
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
                <p className='create-post-text'>Add New Review</p>
                <div>
                    <input
                        type='text'
                        className='content-field'
                        name='content'
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        placeholder='Content'
                        ></input>
                </div>
                <div>
                <div>
                    <div>Select Rating</div>
                    <select value={rating} onChange={e => setRating(e.target.value)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    </div>
                </div>
                <button className='review-submit-button' type='submit'>Post Review</button>
                {/* <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button> */}
            </form>
        </div>
    );
};

export default PostReview;