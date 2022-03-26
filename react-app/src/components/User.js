import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../store/games';
import { userGames } from '../store/usergames';
import GameDetailsModal from './Modals/GameDetailsModal';
import './User.css';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();

  const games = useSelector((state => state.usergame))

  useEffect(() => {
    // dispatch(getAllGames)
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

  const defaultImg="https://images.nintendolife.com/428c8ddbb2c32/smm2.large.jpg"
  // <img className='profilePicMain' src={user.profile_pic ? user.profile_pic : defaultProfilePic}/>



  return (
    <div className='profile-page-container'>
          {/* <img className='profile-picture' alt='Try a new link' src={user.profile_picture ? user.profile_picture : defaultImg }/> */}
      <div className='profile-page-top-div'>
        <img className='profile-picture' src={user.profile_picture} alt='Bad link' onError={(e)=>{e.target.src=defaultImg}}/>
        <div className='user-info'>
          <div>{user.username}</div>
          <div>{user.email}</div>
        </div>
      </div>
      <h2 className='games-list-title'>
        {user.username}'s Games
      </h2>
      <div className='game-post-container'>
      {games.userGames && games.userGames.map((game) => (
                <div className='game-post' key={game.id}>
                    <GameDetailsModal game={game}/>
                </div>
            ))}
      </div>
    </div>
  );
}
export default User;
