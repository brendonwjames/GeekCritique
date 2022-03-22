import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, getOneGame } from '../store/games';
import { userGames } from '../store/usergames';
import GameDetailsModal from './Modals/GameDetailsModal';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();

  const games = useSelector((state => state.usergame))

  // console.log('GENIUS:', games.userGames)

  useEffect(() => {
    console.log('FIND THIS USEEFFECT')
    dispatch(getAllGames)
    dispatch(userGames(userId))

    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId, dispatch]);

  if (!user) {
    return null;
  }

//   const handleEdit = async(e) => {
//     e.preventDefault();

//     const editedGame = {name, description, img_src}

//     const result = await dispatch(updateGame(game.id, editedGame))

//     if (result === 'Success!') {
//         setShowModal(false)
//         dispatch(getOneGame(game.id))
//     }

//     else if (result) {
//         setErrors(result);
//     }
// }

  const defaultImg="https://www.nintendoenthusiast.com/wp-content/uploads/2017/01/mario-sad.jpeg"

  return (
    <div className='profile-page-container'>
          <img className='profile-picture' src={user.profile_picture} alt='Bad link' onError={(e)=>{e.target.src=defaultImg}}/>
          <div>{user.username}</div>
          <div>{user.email}</div>
      {games.userGames && games.userGames.map((game) => (
                <div className='game-post' key={game.id}>
                    <GameDetailsModal game={game}/>
                </div>
            ))}
    </div>
  );
}
export default User;
