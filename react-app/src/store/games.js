const GET_GAMES = 'games/GET_GAMES';

const getGames = (allgames) => ({
    type: GET_GAMES,
    allGames: allgames
})

export const getAllGames = () => async(dispatch) => {
    const response = await fetch('/games');
    console.log(response, 'aiming for these games')

    if (response.ok) {
        const games = await response.json();
        console.log('GAMES', games)
        dispatch(getGames(games))
    }
    return response;
}


// export default function gameReducer (state = {}, action) {
//     let newState;
//     switch (action.type) {
//         case GET_GAMES:
//             newState = {}
//             action.games.forEach(game => newState[game.id] = game)
//             return newState
//         default:
//             return state
//     }
// }

const initialState = {games:{}}

export default function gameReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_GAMES:
            newState = {...state}
            console.log('action.allgames.games in the reducer:', action.allGames.games)
            action.allGames.games.forEach(game => newState.games[game.id] = game)
            console.log('THE NEW STATE:', newState)
            return newState
        default:
            return state
    }
}