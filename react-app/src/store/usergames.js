const GET_USER_GAMES = 'games/GET_USER_GAMES';

const getUserGames = (userGames) => ({
    type: GET_USER_GAMES,
    userGames
})

export const userGames = (userId) => async(dispatch) => {
    // console.log('backend USERID', userId)
    const response = await fetch(`/api/users/${userId}/games`)

    if (response.ok) {
        const games = await response.json();
        dispatch(getUserGames(games))
    }
    return response;
}

const initialState = {};

export default function userGameReducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_USER_GAMES:
            // console.log('ACTION.USERGAMES', action.userGames.usergames)
            newState = {...state}
            newState.userGames = [...action.userGames.usergames]
            return newState
            default:
                return state
    }
}