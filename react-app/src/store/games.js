const GET_GAMES = 'games/GET_GAMES';
const CREATE_GAME = 'games/CREATE_GAME';

const getGames = (allgames) => ({
    type: GET_GAMES,
    allGames: allgames
})

const createGame = (game) => ({
    type: CREATE_GAME,
    newGame: game
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

const initialState = {games:[]}

export default function gameReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_GAMES:
            newState = {...state}
            newState.games = [...action.allGames.games]
            newState.games.forEach(game => newState[game.id] = game)
            return newState
        case CREATE_GAME:
            newState = {...state}
            console.log('CREATEGAME NEWSTATE:', newState)
            newState.games = [...newState.games, action.newGame];
            // newState.userGames = [...newState.userGames, action.newGame]
            return newState
        default:
            return state
    }
}