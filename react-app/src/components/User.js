import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, userGames } from '../store/games';
import GameDetailsModal from './Modals/GameDetailsModal';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();

  const games = useSelector((state => Object.values(state)))
  // console.log('USER GAMES:', games[1].userGames, 'USER ID:', userId)
  const userGamesArr = games[1].userGames;

  console.log('USERGAMES:', userGamesArr)

  useEffect(() => {
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
  }, [userId, userGames]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      {userGamesArr && userGamesArr.map((game) => (
                <div className='game-post' key={game.id}>
                    <GameDetailsModal game={game}/>
                </div>
            ))}
    </div>
  );
}
export default User;
