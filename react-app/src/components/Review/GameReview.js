import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allReviews } from "../../store/reviews";
import { getUsers } from "../../store/session";
import { NavLink } from 'react-router-dom';
import EditReviewModal from "../Modals/EditReviewModal";
import DeleteReview from "./DeleteReview";
import './GameReview.css';

const GameReview = ({ game }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allReviews(game.id));
        dispatch(getUsers())

    }, [game.id, dispatch])

    const user = useSelector((state) => state.session.user);
    // console.log('game from the game review component', game)
    const review = useSelector((state) => Object.values(state.review))
    const allUsers = useSelector((state) => (state.session.allUsers))

    const ratingArr = review.map((review) => (
        review.rating
    ))

    const totalRating = ratingArr.reduce((a, b) => a + b, 0)

    let avgRating = 0;
    if (totalRating > 0) {
        avgRating = (totalRating / ratingArr.length).toFixed(1)
    }


    return (
        <div>
            <div className='review-top-line'>
                <div className='review-total-rating'>Total Rating: {totalRating}</div>
                <h3 className='review-title'>Reviews</h3>
                <div className='review-average-rating'>Average Rating: {avgRating}</div>
            </div>
            {review.map((review) => (
                <div key={review.id} className='review-container'>
                    <div className='review-poster-info'>
                        <NavLink to={`/users/${review.user_id}`} exact={true} activeClassName='active' key={review.id}>
                            {allUsers[review.user_id].username}
                        </NavLink>
                        <div>Rating: {review.rating}</div>
                    </div>
                    <div className='review-content' key={review.id}>
                        <div className='review-content'key={review.id}>{review.content}</div>
                        <div className='review-buttons'>
                            {(user.id === review.user_id) && <EditReviewModal game={game} review={review}/>}
                            {user.id === review.user_id && <DeleteReview review={review}/>}
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default GameReview;