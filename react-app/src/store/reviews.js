const GET_REVIEWS = 'reviews/GET_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const getReviews = (gameReviews) => ({
    type: GET_REVIEWS,
    gameReviews
})

const createReview = (review) => ({
    type: CREATE_REVIEW,
    newReview: review
})

const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
})

const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review
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

export const updateReview = (reviewId, editedReview) => async(dispatch) => {
    const response = await fetch(`/reviews/${reviewId}/edit`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editedReview)
    });

    if (response.ok) {
        const editedReview = await response.json();
        console.log('editedReview:', editedReview)
        dispatch((editReview(editedReview)))
        return 'Success!'
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const removeReview = (reviewId) => async(dispatch) => {
    const response = await fetch(`/reviews/${reviewId}/delete`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
    
    if (response.ok) {
        const review = await response.json()
        dispatch(deleteReview(review))
    }
}

const initialState = {};

export default function reviewReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_REVIEWS:
            action.gameReviews.reviews.forEach((review) => newState[review.id] = review)
            // newState.gameReviews=[...action.reviews];
            // action.gameReviews.users.forEach((user) => newState.users[user.id] = user)
            return newState
        case CREATE_REVIEW:
            newState[action.newReview.id] = action.newReview;
            return newState
        case EDIT_REVIEW:
            // console.log('EDIT GAME REDUCER ACTION.GAME', action.game)
            newState[action.review.id] = {...action.review};
            return newState
        case DELETE_REVIEW:
            delete newState[action.review.id]
            return newState
        default:
            return state
    }
}