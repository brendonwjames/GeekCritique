const GET_REVIEWS = 'reviews/GET_REVIEWS';

const getReviews = (gameReviews) => ({
    type: GET_REVIEWS,
    gameReviews
})

export const allReviews = (id) => async(dispatch) => {
    const response = await fetch(`/reviews/${id}`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(getReviews(reviews))
    }
    return response
}

const initialState = {};

export default function reviewReducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_REVIEWS:
            newState = {}
            action.gameReviews.reviews.forEach((review) => newState[review.id] = review)
            // newState.gameReviews=[...action.reviews];
            // action.gameReviews.users.forEach((user) => newState.users[user.id] = user)
            return newState
        default:
            return state
    }
}