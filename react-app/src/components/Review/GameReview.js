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

    }, [game.id])

    const user = useSelector((state) => state.session.user);
    // console.log('game from the game review component', game)
    const review = useSelector((state) => Object.values(state.review))
    const allUsers = useSelector((state) => (state.session.allUsers))

    // const all_users = Object.values(allUsers)

    console.log('allusers',allUsers)
    // console.log('TEST', all_users)

    console.log('REVIEW:', review)

    const ratingArr = review.map((review) => (
        review.rating
    ))

    console.log('RATINg ARR:', ratingArr)

    const totalRating = ratingArr.reduce((a, b) => a + b, 0)

    let avgRating = 0;
    if (totalRating > 0) {
        avgRating = (totalRating / ratingArr.length).toFixed(1)
    }

    console.log('AVG RATING:', avgRating)
    
    console.log('TOTAL RATING:', totalRating)

    // let test = '';
    // if (allUsers[review.user_id].username !== undefined ) {
    //     test = <div>{allUsers[review.user_id].username}</div>
    //}

    return (
        <div className='game-review-container'>
            Reviews
            <div className='review-total-rating'>Total Rating: {totalRating}</div>
            <div className='review-average-rating'>Average Rating: {avgRating}</div>
            {review.map((review) => (
                <div>
                    <div className='review-content' key={review.id}>
                        <NavLink to={`/users/${review.user_id}`} exact={true} activeClassName='active'>
                            {/* {all_users[review.user_id]} */}
                        </NavLink>
                        <div className='review-content'>{review.content}</div>
                        {(user.id === review.user_id) && <EditReviewModal game={game} review={review}/>}
                        {user.id === review.user_id && <DeleteReview review={review}/>}
                    </div>
                </div>
            ))}

        </div>
    );
};

export default GameReview;