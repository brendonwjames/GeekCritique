const GET_USER_SHELVES = 'shelves/GET_USER_SHELVES';

const userShelves = (userShelves) => ({
    type: GET_USER_SHELVES,
    userShelves
})

export const getUserShelves = () => async (dispatch) => {
    const response = await fetch(`/shelves`)

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
            action.userShelves.shelves.forEach(shelf => newState[shelf.id] = shelf)
            return newState
        default:
            return state
    }
}