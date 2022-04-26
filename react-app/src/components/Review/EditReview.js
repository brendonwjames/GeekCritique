import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "../../store/reviews";
import './EditReview.css';

const EditReview = ({ setShowModal, game, review }) => {
    const [content, setContent] = useState(review.content);
    const [rating, setRating] = useState(review.rating);
    const [errors, setErrors] = useState([]);
    const [hover, setHover] = useState(0);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const user_id = user.id;
    const game_id = game.id;


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
        <div className='edit-review-container'>
            <form className='new-review-form' onSubmit={handleEdit}>
                <div className='review-errors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                </div>
                <div className='rating-top-div'>
                    <p className='create-post-text'>Edit Your Review</p>
                    <div className='star-rating'>
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                        type='button'
                                        key={index}
                                        className={index <= (hover || rating) ? 'on' : 'off'}
                                        onClick={() => setRating(index)}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover(rating)}
                                    // onChange={(e) => setRating(e.target.value)}
                                    >
                                        <span className='star'>&#9733;</span>
                                    </button>
                                );
                            })}
                        </div>
                </div>
                <div className='content'>
                    <textarea
                        type='text'
                        className='content-field'
                        name='content'
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        placeholder='Content'
                        ></textarea>
                </div>
                <div>
                </div>
                <div className='buttons-div'>
                    <button className='review-submit-button' type='submit'>Submit</button>
                    <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditReview;