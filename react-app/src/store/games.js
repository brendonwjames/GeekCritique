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
        console.log('GAMES', games)
        dispatch(getGames(games))
    }
    return response;
}

export const getOneGame = (gameId) => async(dispatch) => {
    // console.log('GETONEGAME THUNK:', gameId)
    const response = await fetch(`/games/${gameId}`);

    if (response.ok) {
        const game = await response.json();
        dispatch(getGame(game))
        return response
    }
}

export const addGame = (formData) => async(dispatch) => {
    // console.log('formDATA', formData)
    const { owner_id, name, description, img_src, createdAt } = formData;

    const response = await fetch('/games/new_game', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ owner_id, name, description, img_src, createdAt })
    })
    // console.log('RESPONSE:', response)

    if (response.ok) {
        const newGame = await response.json();
        console.log('NEWGAME:', newGame)
        dispatch(createGame(newGame))
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

export const updateGame = (gameId, editedGame) => async (dispatch) => {
    console.log('EDITED DATA THUNK:', editedGame)
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
    // console.log('BACKEND DELETE GAMEID:', gameId)
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
            console.log('GET GAME REDUCER:', action.game.id = action.game)
            // newState[action.game.id] = action.game;
            newState[action.game.id] = {...action.game}; //possible alternative?
            return newState;

        case CREATE_GAME:
            // console.log('CREATEGAME NEWSTATE:', newState)
            newState[action.newGame.id] = action.newGame;
            // newState.userGames = [...newState.userGames, action.newGame]
            return newState
        case EDIT_GAME:
            // console.log('EDIT GAME REDUCER ACTION.GAME', action.game)
            newState[action.game.id] = {...action.game};
            return newState
        case DELETE_GAME:
            // console.log('DELETEGAME REDUCER:', action.game.id)
            delete newState[action.game.id]
            return newState
        default:
            return state
    }
}