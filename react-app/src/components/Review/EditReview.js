import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "../../store/reviews";
import './GameReview.css';

const EditReview = ({ setShowModal, game, review }) => {
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(3);
    const [errors, setErrors] = useState([]);

    // console.log('ERROR:', errors)

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    // const review = useSelector((state) => state.review)
    const user_id = user.id;
    const game_id = game.id;

    // console.log('REVIEW:', review);

    // console.log('RATING', rating)

    const handleEdit = async(e) => {
        e.preventDefault();
        const editedReview = {user_id, game_id, content, rating, }

        const result = await dispatch(updateReview(review.id, editedReview))

        if (result === 'Success!') {
            setShowModal(false)
        }

        else if (result) {
            setErrors(result);
        }
    }

    return (
        <div className='post-review-container'>
            <form className='new-review-form' onSubmit={handleEdit}>
                <div className='review-errors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                </div>
                <p className='create-post-text'>Edit Your Review</p>
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
                <button className='review-submit-button' type='submit'>Submit</button>
                <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
            </form>
        </div>
    );
};

export default EditReview;