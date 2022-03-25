const GET_USER_SHELVES = 'shelves/GET_USER_SHELVES';

const userShelves = (userShelves) => ({
    type: GET_USER_SHELVES,
    userShelves
})

export const getUserShelves = (userId) => async (dispatch) => {
    console.log('SHELVES: backend', userId)
    const response = await fetch(`/shelves/${userId}`)

    if (response.ok) {
        const shelves = await response.json();
        console.log('SHELVES:', shelves)
        dispatch(userShelves(shelves))
    }
    return response
}

const initialState = {};

export default function shelvesReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_USER_SHELVES:
            newState.userShelves = [...action.userShelves.shelves]
            return newState
        default:
            return state
    }
}