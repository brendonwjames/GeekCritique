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
    console.log('formDATA', formData)
    const response = await fetch('/new_game', {
        method: 'POST',
        body: formData
    })
    console.log('RESPONSE:', response)

    if (response.ok) {
        const newGame = await response.json();
        dispatch(createGame(newGame))
        return 'Success'
    }
    return response
}

// export const add_board = (board) => {
//     const { name, user_id } = board;

//     const form = new FormData()
//     form.append('name', name)
//     form.append('user_id', user_id)

//     const response = await fetch(`/api/boards/`, {
//         method: "POST",
//         body: form
//     });

//     if (response.ok) {
//         const board = await response.json();
//         dispatch(add(board));
//         return board;
//     } else {
//         const errors = await response.json();
//         return errors;
//     }
// };

const initialState = {games:{}}

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
            newState.games = [action.newGame, ...newState.games];
            // newState.userGames = [...newState.userGames, action.newGame]
            return newState
        default:
            return state
    }
}