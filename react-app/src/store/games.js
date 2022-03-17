const GET_GAMES = 'games/GET_GAMES';
const CREATE_GAME = 'games/CREATE_GAME';
const EDIT_GAME = 'games/EDIT_GAME';

const getGames = (allgames) => ({
    type: GET_GAMES,
    allgames
})

const createGame = (game) => ({
    type: CREATE_GAME,
    newGame: game
})

const editGame = (game) => ({
    type: EDIT_GAME,
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
        return 'Success'
    }
    return response
}

export const updateGame = (formData, gameId) => async (dispatch) => {
    const response = await fetch(`/games/${gameId}/edit`, {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        const editedGame = await response.json();
        dispatch(editGame(editedGame))
        return 'Success!'
    }
}

const initialState = {};

export default function gameReducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_GAMES:
            //newState is equivalent to accessing state.game
            // console.log('********', action.allgames.games)
            // newState.games = [...action.allGames.games]
            action.allgames.games.forEach(game => newState[game.id] = game)
            return newState
        case CREATE_GAME:
            // console.log('CREATEGAME NEWSTATE:', newState)
            newState[action.newGame.id] = action.newGame;
            // newState.userGames = [...newState.userGames, action.newGame]
            return newState
        default:
            return state
    }
}