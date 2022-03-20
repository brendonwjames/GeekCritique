import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import EditModal from "../Modals/EditModal";
// import DeleteModal from "../Modals/DeleteModal";
import { allReviews, createReview } from "../../store/reviews";
import EditReviewModal from "../Modals/EditReviewModal";
import './GameReview.css';

const GameReview = ({ game }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    // console.log('game from the game review component', game)
    const review = useSelector((state) => Object.values(state.review))
    // console.log('REVIEW:', review)

    useEffect(() => {
        dispatch(allReviews(game.id));
    }, [dispatch])

    return (
        <div className='game-review-container'>
            Reviews
            {review.map((review) => (
                <div className='review-content' key={review.id}>
                    {/* <div className='review-owner'>{user}</div> */}
                    <div className='review-rating'>Rating: {review.rating}</div>
                    <div className='review-content'>{review.content}</div>
                    <EditReviewModal game={game} review={review}/>

                </div>
            ))}

        </div>
    );
};

export default GameReview;