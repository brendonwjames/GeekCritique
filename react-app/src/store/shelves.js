const GET_USER_SHELVES = 'shelves/GET_USER_SHELVES';
const CREATE_SHELF = 'shelves/CREATE_SHELF';
const EDIT_SHELF = 'shelves/EDIT_SHELF';
const DELETE_SHELF = 'shelves/DELETE_SHELF';
const ADD_GAME_TO_SHELF = 'shelves/ADD_GAME_TO_SHELF';
const REMOVE_GAME_FROM_SHELF = 'shelves/REMOVE_GAME_FROM_SHELF';

const userShelves = (userShelves) => ({
    type: GET_USER_SHELVES,
    userShelves
})

const createShelf = (shelf) => ({
    type: CREATE_SHELF,
    shelf
})

const editShelf = (shelf) => ({
    type: EDIT_SHELF,
    shelf
})

const deleteShelf = (shelf) => ({
    type: DELETE_SHELF,
    shelf
})

const addToShelf = (game) => ({
    type: ADD_GAME_TO_SHELF,
    game
})

const removeFromShelf = (game) => ({
    type: REMOVE_GAME_FROM_SHELF,
    game
})

export const getUserShelves = (userId) => async (dispatch) => {
    // console.log('SHELVES: backend', userId)
    const response = await fetch(`/shelves/${userId}`)

    if (response.ok) {
        const shelves = await response.json();
        // console.log('SHELVES:', shelves)
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

export const updateShelf = (shelf_Id, editedShelf) => async (dispatch) => {
    // console.log('EDITED SHELF', editedShelf)
    const response = await fetch(`/shelves/${shelf_Id}/edit`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editedShelf)
    })

    if (response.ok) {
        console.log('SUCCESSFUL EDIT OF SHELF')
        const editedShelf = await response.json();
        dispatch(editShelf(editedShelf))
        return 'Success!'
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
    }
}

export const removeShelf = (shelf_Id) => async(dispatch) => {
    const response = await fetch(`/shelves/${shelf_Id}/delete`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })

    if (response.ok) {
        // const game = await response.json()
        await dispatch(deleteShelf(shelf_Id))
    }
}

export const addGameToShelf = (gameToShelf, shelf_Id, game_Id ) => async (dispatch) => {
    const { shelf_id, game_id } = gameToShelf;

    const response = await fetch(`/shelves/add_to_shelf/${shelf_Id}/games/${game_Id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shelf_id, game_id })
    })

    if (response.ok) {
        const shelf = await response.json();
        // console.log('added to Shelf:', shelf)
        dispatch((addToShelf(shelf)))
        // return ['Added to shelf!']
        return 'Success!'
    } 
     else {
        return ['Please choose a valid shelf!']
    }
}

export const removeGameFromShelf = ((gameShelf, shelf_Id, game_Id ) => async (dispatch) => {
    const { shelf_id, game_id } = gameShelf;
    const response = await fetch(`/shelves/remove_from_shelf/${shelf_Id}/games/${game_Id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ shelf_id, game_id })
    })

    if (response.ok) {
        const game = await response.json()
        dispatch(removeFromShelf(game))
    }
})

const initialState = {};

export default function shelvesReducer(state = initialState, action) { 
    let newState = { ...state }
    switch (action.type) {
        case GET_USER_SHELVES:
            newState.userShelves = {...action.userShelves.shelves}
            return newState
        case CREATE_SHELF:
            // console.log('CREATE SHELF REDUCER:', 'ACTION:', action, 'NEWSTATE:', newState)
            newState.userShelves = [...newState.userShelves, action.shelf];
            return newState
        // case ADD_GAME_TO_SHELF:
        //     console.log(newState.userShelves);
        //     console.log('ACTION.GAME:', action.game)
        //     newState.userShelves = [...newState.userShelves, action.game];
        //     return newState
        case EDIT_SHELF:
            // console.log('ACTION.SHELF.USERSHELVES', action.shelf.userShelves)
            console.log("**NEWSTATE**:", newState)
            console.log('EDIT SHELF CASE STORE Action.shelf.id', action.shelf.id)
            newState[action.shelf.userShelves] = action.shelf.userShelves;
            return {...newState}
        case DELETE_SHELF:
            delete newState[action.shelf.id]
            return newState
        default:
            return state
    }
}