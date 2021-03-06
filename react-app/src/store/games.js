const GET_GAMES = 'games/GET_GAMES';
const GET_GAME = 'games/GET_GAME';
const CREATE_GAME = 'games/CREATE_GAME';
const EDIT_GAME = 'games/EDIT_GAME';
const DELETE_GAME = 'games/DELETE_GAME';

const getGames = (allgames) => ({
    type: GET_GAMES,
    allgames
})

const getGame = (game) => ({
    type: GET_GAME,
    game
})

const createGame = (game) => ({
    type: CREATE_GAME,
    newGame: game
})

const editGame = (game) => ({
    type: EDIT_GAME,
    game
})

const deleteGame = (game) => ({
    type: DELETE_GAME,
    game
})

export const getAllGames = () => async(dispatch) => { 
    const response = await fetch('/games');

    if (response.ok) {
        const games = await response.json();
        dispatch(getGames(games))
    }
    return response;
}

export const getOneGame = (gameId) => async(dispatch) => {
    const response = await fetch(`/games/${gameId}`);

    if (response.ok) {
        const game = await response.json();
        dispatch(getGame(game))
        return response
    }
}

export const addGame = (formData) => async(dispatch) => {
    // const { owner_id, name, description, img_src, createdAt } = formData;

    const response = await fetch('/games/new_game', {
        method: 'POST',
        // headers: {'Content-Type': 'application/json'},
        body: formData
    })

    if (response.ok) {
        const newGame = await response.json();
        // console.log('NEWGAME:', newGame)
        dispatch(createGame(newGame))
        return 'Success!'
    }
    else if (response.status < 500) {
        const data = await response.json();
        console.log('backend DATA:', data.errors)
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
    }
}

export const updateGame = (gameId, editedGame) => async (dispatch) => {
    const response = await fetch(`/games/${gameId}/edit`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editedGame)
    });

    if (response.ok) {
        const editedGame = await response.json();
        dispatch(editGame(editedGame))
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

export const removeGame = (gameId) => async(dispatch) => {
    const response = await fetch(`/games/${gameId}/delete`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })

    if (response.ok) {
        const game = await response.json()
        dispatch(deleteGame(game))
    }
}

const initialState = {}; 

export default function gameReducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_GAMES:
            //newState is equivalent to accessing state.game
            // console.log('********', action.allgames.games)
            action.allgames.games.forEach(game => newState[game.id] = game)
            return newState
        case GET_GAME:
            newState[action.game.id] = {...action.game};
            return newState;
        case CREATE_GAME:
            // console.log('CREATEGAME NEWSTATE:', newState)
            newState[action.newGame.id] = action.newGame;
            return newState
        case EDIT_GAME:
            newState[action.game.id] = {...action.game};
            return newState
        case DELETE_GAME:
            delete newState[action.game.id]
            return newState
        default:
            return state
    }
}