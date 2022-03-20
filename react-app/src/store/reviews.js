const GET_REVIEWS = 'reviews/GET_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';

const getReviews = (gameReviews) => ({
    type: GET_REVIEWS,
    gameReviews
})

const createReview = (game) => ({
    type: CREATE_REVIEW,
    newReview: game
})

export const allReviews = (id) => async (dispatch) => {
    const response = await fetch(`/reviews/${id}`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(getReviews(reviews))
    }
    return response
}

export const addReview = (newReview) => async (dispatch) => {
    const { user_id, game_id, content, rating } = newReview;

    const response = await fetch('/reviews/new_review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, game_id, content, rating })
    })

    if (response.ok) {
        const newReview = await response.json();
        console.log('newReview:', newReview)
        dispatch((createReview(newReview)))
        return 
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

const initialState = {};

export default function reviewReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_REVIEWS:
            newState = {}
            action.gameReviews.reviews.forEach((review) => newState[review.id] = review)
            // newState.gameReviews=[...action.reviews];
            // action.gameReviews.users.forEach((user) => newState.users[user.id] = user)
            return newState
        case CREATE_REVIEW:
            newState[action.newReview.id] = action.newReview;
            return newState
        default:
            return state
    }
}