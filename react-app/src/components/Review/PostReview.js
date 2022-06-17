import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../store/reviews";
import './PostReview.css';
// import StarRating from "./StarRating";
import './StarRating.css';

const PostReview = ({ game }) => {
    const [content, setContent] = useState('');
    // const [rating, setRating] = useState();
    const [errors, setErrors] = useState([]);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    // console.log('ERROR:', errors)

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const user_id = user.id;
    const game_id = game.id;

    // console.log('RATING', rating)

    const reset = () => {
        setContent("");
        setRating();
        setErrors([]);
        setHover('off')
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const review = { user_id, game_id, content, rating }


        const result = await dispatch(addReview(review))

        if (result) {
            setErrors(result);
        } else {
            reset()
        }
    }

    return (
        <div className='post-review-container'>
            <form className='new-review-form' onSubmit={handleSubmit}>
                <div className='review-top-div'>
                    <button className='review-submit-button' type='submit'>Post Review</button>
                    <div>
                        <div>Select Game Rating</div>
                        {/* <select value={rating} onChange={e => setRating(e.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <StarRating /> */}
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
                </div>
                <div className='review-errors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <textarea
                        type='text'
                        className='create-review-input'
                        name='content'
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        placeholder='Add your review here!'
                    ></textarea>
                </div>
            </form>
        </div>
    );
};

export default PostReview;