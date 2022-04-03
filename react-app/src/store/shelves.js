const GET_USER_SHELVES = 'shelves/GET_USER_SHELVES';
const CREATE_SHELF = 'shelves/CREATE_SHELF';
const ADD_GAME_TO_SHELF = 'shelves/ADD_GAME_TO_SHELF';

const userShelves = (userShelves) => ({
    type: GET_USER_SHELVES,
    userShelves
})

const createShelf = (shelf) => ({
    type: CREATE_SHELF,
    shelf
})

const addToShelf = (game) => ({
    type: ADD_GAME_TO_SHELF,
    game
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

export const newShelf = (newShelf) => async (dispatch) => {
    const { owner_id, name } = newShelf;

    const response = await fetch('/shelves/new_shelf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ owner_id, name })
    })

    if (response.ok) {
        const newShelf = await response.json();
        console.log('newShelf:', newShelf)
        dispatch((createShelf(newShelf)))
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

export const addGameToShelf = (gameToShelf) => async (dispatch) => {
    const { shelf_id, game_id } = gameToShelf;

    const response = await fetch('/shelves/add_to_shelf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shelf_id, game_id })
    })

    if (response.ok) {
        const shelf = await response.json();
        console.log('added to Shelf:', shelf)
        dispatch((addGameToShelf(shelf)))
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

const initialState = {};

export default function shelvesReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_USER_SHELVES:
            // newState[action.game.id] = {...action.game}; //possible alternative?
            newState.userShelves = [...action.userShelves.shelves]
            return newState
        case CREATE_SHELF:
            console.log('CREATE SHELF REDUCER:', action.shelf)
            newState[action.shelf] = action.shelf.userShelves; //works, has unused undefined in it
            return  newState
        default:
            return state
    }
}