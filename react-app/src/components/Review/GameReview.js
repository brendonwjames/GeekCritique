import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allReviews } from "../../store/reviews";
import EditReviewModal from "../Modals/EditReviewModal";
import DeleteReview from "./DeleteReview";
import './GameReview.css';

const GameReview = ({ game }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    // console.log('game from the game review component', game)
    const review = useSelector((state) => Object.values(state.review))

    console.log('REVIEW:', review)

    const ratingArr = review.map((review) => (
        review.rating
    ))

    const totalRating = ratingArr.reduce((a, b) => a + b, 0)

    let avgRating = 0;
    if (totalRating > 0) {
        avgRating = (totalRating / ratingArr.length).toFixed(1)
    }

    console.log('AVG RATING:', avgRating)
    
    console.log('TOTAL RATING:', totalRating)


    useEffect(() => {
        dispatch(allReviews(game.id));
    }, [game.id, dispatch])

    return (
        <div className='game-review-container'>
            Reviews
            <div className='review-total-rating'>Total Rating: {totalRating}</div>
            <div className='review-average-rating'>Average Rating: {avgRating}</div>
            {review.map((review) => (
                <div className='review-content' key={review.id}>
                    {/* <div className='review-owner'>{user}</div> */}
                    <div className='review-content'>{review.content}</div>
                    {(user.id === review.user_id) && <EditReviewModal game={game} review={review}/>}
                    {user.id === review.user_id && <DeleteReview review={review}/>}
                </div>
            ))}

        </div>
    );
};

export default GameReview;